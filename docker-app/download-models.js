#!/usr/bin/env node
/**
 * Download face-api.js models for offline use
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const MODEL_BASE_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';
const MODELS_DIR = path.join(__dirname, 'public', 'models');

const MODELS = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'ssd_mobilenetv1_model-weights_manifest.json',
  'ssd_mobilenetv1_model-shard1',
  'ssd_mobilenetv1_model-shard2',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_landmark_68_tiny_model-weights_manifest.json',
  'face_landmark_68_tiny_model-shard1',
  'face_expression_model-weights_manifest.json',
  'face_expression_model-shard1',
  'age_gender_model-weights_manifest.json',
  'age_gender_model-shard1'
];

// Create models directory if it doesn't exist
if (!fs.existsSync(MODELS_DIR)) {
  fs.mkdirSync(MODELS_DIR, { recursive: true });
}

console.log('Downloading face-api.js models...');

let downloadedCount = 0;
const totalModels = MODELS.length;

function downloadModel(modelName) {
  return new Promise((resolve, reject) => {
    const modelPath = path.join(MODELS_DIR, modelName);
    
    // Skip if already exists
    if (fs.existsSync(modelPath)) {
      console.log(`✓ ${modelName} (cached)`);
      resolve();
      return;
    }
    
    const url = MODEL_BASE_URL + modelName;
    const file = fs.createWriteStream(modelPath);
    
    console.log(`Downloading ${modelName}...`);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ ${modelName}`);
          resolve();
        });
      } else {
        fs.unlink(modelPath, () => {}); // Delete partial file
        reject(new Error(`Failed to download ${modelName}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(modelPath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

async function downloadAllModels() {
  console.log(`Starting download of ${totalModels} model files...`);
  
  try {
    // Download models in parallel (but limit concurrency)
    const batchSize = 3;
    for (let i = 0; i < MODELS.length; i += batchSize) {
      const batch = MODELS.slice(i, i + batchSize);
      await Promise.all(batch.map(downloadModel));
      downloadedCount += batch.length;
      console.log(`Progress: ${downloadedCount}/${totalModels}`);
    }
    
    console.log('\n✅ All models downloaded successfully!');
    console.log(`Models saved to: ${MODELS_DIR}`);
    
    // Create a manifest file
    const manifest = {
      timestamp: new Date().toISOString(),
      models: MODELS,
      totalSize: fs.readdirSync(MODELS_DIR).reduce((total, file) => {
        const stats = fs.statSync(path.join(MODELS_DIR, file));
        return total + stats.size;
      }, 0)
    };
    
    fs.writeFileSync(
      path.join(MODELS_DIR, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    
    console.log(`Total size: ${(manifest.totalSize / 1024 / 1024).toFixed(2)} MB`);
    
  } catch (error) {
    console.error('❌ Error downloading models:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  downloadAllModels();
}

module.exports = { downloadAllModels };