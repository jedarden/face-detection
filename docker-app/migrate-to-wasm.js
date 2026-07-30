#!/usr/bin/env node
/**
 * Migration script to switch from face-api.js to WASM implementation
 * This preserves the ability to rollback if needed
 */

const fs = require('fs');
const path = require('path');

const BACKUP_SUFFIX = '.pre-wasm';
const FILES_TO_UPDATE = [
  'src/index.js',
  'src/proMode.js',
  'src/faceDetection.js',
  'webpack.common.js'
];

function createBackup(filePath) {
  const backupPath = filePath + BACKUP_SUFFIX;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`✓ Backed up ${filePath} to ${backupPath}`);
  } else {
    console.log(`⚠ Backup already exists for ${filePath}`);
  }
}

function updateImports(content) {
  // Replace face-api.js imports with @vladmandic/face-api
  return content.replace(
    /from ['"]face-api\.js['"]/g,
    "from '@vladmandic/face-api'"
  );
}

function updateWebpackEntry(content) {
  // Update webpack entry to use index-wasm.js
  return content.replace(
    /entry: ['"]\.\/src\/index\.js['"]/,
    "entry: './src/index-wasm.js'"
  );
}

function migrateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`✗ File not found: ${filePath}`);
    return false;
  }

  createBackup(filePath);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (filePath.includes('webpack')) {
    content = updateWebpackEntry(content);
  } else {
    content = updateImports(content);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✓ Updated ${filePath}`);
  return true;
}

function createWasmConfig() {
  const configPath = 'wasm.config.json';
  const config = {
    backend: 'wasm',
    features: {
      simd: true,
      threads: true
    },
    fallback: 'webgl',
    modelPath: '/models'
  };
  
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`✓ Created ${configPath}`);
}

function updatePackageJson() {
  const packagePath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  // Add migration scripts
  packageJson.scripts['migrate:wasm'] = 'node migrate-to-wasm.js';
  packageJson.scripts['migrate:rollback'] = 'node migrate-to-wasm.js --rollback';
  packageJson.scripts['test:wasm'] = 'jest tests/unit/wasmMigration.test.js';
  packageJson.scripts['benchmark:wasm'] = 'node src/wasmBenchmark.js';
  
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log('✓ Updated package.json with migration scripts');
}

function rollback() {
  console.log('Rolling back to pre-WASM version...');
  
  FILES_TO_UPDATE.forEach(filePath => {
    const backupPath = filePath + BACKUP_SUFFIX;
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, filePath);
      console.log(`✓ Restored ${filePath} from backup`);
    } else {
      console.log(`⚠ No backup found for ${filePath}`);
    }
  });
  
  // Restore original webpack entry
  const webpackPath = 'webpack.common.js';
  let webpackContent = fs.readFileSync(webpackPath, 'utf8');
  webpackContent = webpackContent.replace(
    /entry: ['"]\.\/src\/index-wasm\.js['"]/,
    "entry: './src/index.js'"
  );
  fs.writeFileSync(webpackPath, webpackContent);
  
  console.log('✓ Rollback complete');
}

function main() {
  const args = process.argv.slice(2);
  const isRollback = args.includes('--rollback');
  
  if (isRollback) {
    rollback();
    return;
  }
  
  console.log('Starting WASM migration...');
  console.log('This will:');
  console.log('1. Create backups of existing files');
  console.log('2. Update imports to use @vladmandic/face-api');
  console.log('3. Switch to WASM-enabled implementation');
  console.log('4. Create WASM configuration file');
  console.log('');
  
  // Check if index-wasm.js exists
  if (!fs.existsSync('src/index-wasm.js')) {
    console.error('✗ src/index-wasm.js not found. Please ensure WASM implementation is ready.');
    process.exit(1);
  }
  
  // Migrate files
  let success = true;
  FILES_TO_UPDATE.forEach(filePath => {
    if (!migrateFile(filePath)) {
      success = false;
    }
  });
  
  if (success) {
    createWasmConfig();
    updatePackageJson();
    
    console.log('\n✅ Migration complete!');
    console.log('\nNext steps:');
    console.log('1. Run: npm install');
    console.log('2. Run: npm run test:wasm');
    console.log('3. Run: npm run benchmark:wasm');
    console.log('4. Build: npm run build');
    console.log('\nTo rollback: npm run migrate:rollback');
  } else {
    console.error('\n✗ Migration failed. Please check errors above.');
    process.exit(1);
  }
}

main();