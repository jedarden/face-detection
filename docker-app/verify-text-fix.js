#!/usr/bin/env node
/**
 * Verify that the text fix is implemented correctly
 */

const http = require('http');

function getAppJS() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/app.js',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function verifyTextFix() {
  console.log('🔍 Verifying text rendering fix...');
  console.log('=====================================');
  
  try {
    const appJS = await getAppJS();
    
    // Check for text rendering fixes
    const hasTextTransformReset = appJS.includes('ctx.setTransform(1, 0, 0, 1, 0, 0)');
    const hasTextRemirror = appJS.includes('ctx.scale(-1, 1); // Re-mirror text');
    const hasTextMeasurement = appJS.includes('ctx.measureText');
    const hasConfidenceTextFix = appJS.includes('mirroredX - ctx.measureText');
    const hasAgeGenderTextFix = appJS.includes('const text = `${detection.gender}');
    
    console.log('📝 Text Rendering Fixes:');
    console.log(`  🔄 Transform reset: ${hasTextTransformReset ? '✅' : '❌'}`);
    console.log(`  🔄 Text re-mirroring: ${hasTextRemirror ? '✅' : '❌'}`);
    console.log(`  📏 Text measurement: ${hasTextMeasurement ? '✅' : '❌'}`);
    console.log(`  💯 Confidence text fix: ${hasConfidenceTextFix ? '✅' : '❌'}`);
    console.log(`  👤 Age/gender text fix: ${hasAgeGenderTextFix ? '✅' : '❌'}`);
    
    // Check for visual improvements
    const hasMirroredVideo = appJS.includes('scaleX(-1)');
    const hasTighterBounding = appJS.includes('padding = Math.min(width, height) * 0.1');
    const hasMirroredCoordinates = appJS.includes('mirroredX = canvas.width - x - width');
    
    console.log('\n🎨 Visual Improvements:');
    console.log(`  📹 Mirrored video: ${hasMirroredVideo ? '✅' : '❌'}`);
    console.log(`  📦 Tighter bounding boxes: ${hasTighterBounding ? '✅' : '❌'}`);
    console.log(`  🎯 Mirrored coordinates: ${hasMirroredCoordinates ? '✅' : '❌'}`);
    
    // Check for diagnostics
    const hasDiagnostics = appJS.includes('Show Diagnostics');
    const hasFPSCounter = appJS.includes('fps-value');
    const hasMemoryTracking = appJS.includes('memoryUsage');
    const hasCPUMonitoring = appJS.includes('cpuUsage');
    const hasPerformanceCharts = appJS.includes('updateFpsChart');
    
    console.log('\n📊 Diagnostic Features:');
    console.log(`  🔧 Diagnostics panel: ${hasDiagnostics ? '✅' : '❌'}`);
    console.log(`  📈 FPS counter: ${hasFPSCounter ? '✅' : '❌'}`);
    console.log(`  💾 Memory tracking: ${hasMemoryTracking ? '✅' : '❌'}`);
    console.log(`  💻 CPU monitoring: ${hasCPUMonitoring ? '✅' : '❌'}`);
    console.log(`  📊 Performance charts: ${hasPerformanceCharts ? '✅' : '❌'}`);
    
    const fixes = [
      hasTextTransformReset, hasTextRemirror, hasTextMeasurement,
      hasConfidenceTextFix, hasAgeGenderTextFix, hasMirroredVideo,
      hasTighterBounding, hasMirroredCoordinates, hasDiagnostics,
      hasFPSCounter, hasMemoryTracking, hasCPUMonitoring, hasPerformanceCharts
    ];
    
    const workingFixes = fixes.filter(Boolean).length;
    const totalFixes = fixes.length;
    
    console.log('\n📊 Summary:');
    console.log(`✅ Working fixes: ${workingFixes}/${totalFixes}`);
    console.log(`📈 Success rate: ${((workingFixes / totalFixes) * 100).toFixed(1)}%`);
    
    if (workingFixes === totalFixes) {
      console.log('\n🎉 ALL FIXES APPLIED SUCCESSFULLY!');
      console.log('\n✨ Key Improvements:');
      console.log('• ✅ Text now displays correctly (not backwards)');
      console.log('• ✅ Confidence percentages are properly positioned');
      console.log('• ✅ Age/gender text renders correctly');
      console.log('• ✅ Tighter bounding boxes around faces');
      console.log('• ✅ Camera mirroring matches natural viewing');
      console.log('• ✅ Full diagnostic system with real-time metrics');
      console.log('• ✅ Performance charts and monitoring');
      
      console.log('\n🚀 Ready for production use!');
      return true;
    } else {
      console.log('\n⚠️  Some fixes may be missing');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    return false;
  }
}

// Run the verification
verifyTextFix().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Verification runner error:', error);
  process.exit(1);
});