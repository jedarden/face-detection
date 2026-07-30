# How to Verify WASM is Running in Face Detection App

This guide provides multiple methods to confirm that WebAssembly (WASM) is actually being used in your face detection application.

## Method 1: Browser Console Checks

### 1.1 Check TensorFlow.js Backend
Open your browser's developer console (F12) and run:
```javascript
// Check current backend
tf.getBackend()
// Should return: "wasm"

// Check all registered backends
tf.engine().registryFactory
// Should show: wasm, webgl, cpu
```

### 1.2 Check WASM Features
```javascript
// Check if WASM is available
typeof WebAssembly
// Should return: "object"

// Check SIMD support
WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,11]))
// Returns: true if SIMD is supported

// Check threads support
typeof SharedArrayBuffer !== 'undefined'
// Returns: true if multi-threading is supported
```

## Method 2: Network Tab Analysis

1. Open Developer Tools → Network Tab
2. Filter by "wasm" or look for files with `.wasm` extension
3. You should see these WASM files being loaded:
   - `tfjs-backend-wasm.wasm` (main WASM module)
   - `tfjs-backend-wasm-simd.wasm` (if SIMD is supported)
   - `tfjs-backend-wasm-threaded-simd.wasm` (if threads + SIMD supported)

## Method 3: Performance Monitoring

### 3.1 Built-in Backend Monitor
The app includes a backend monitor. Check the console for:
```
WASM Backend initialized successfully
Backend: wasm
SIMD Support: true/false
Threads: X
```

### 3.2 Performance Comparison
Compare inference times:
- JavaScript backend: 200-400ms per detection
- WASM backend: 20-50ms per detection
- WASM+SIMD: 15-35ms per detection

## Method 4: Add Visual Indicators

### 4.1 Backend Status Display
Add this code to your app to show backend status:

```javascript
// Add to your app.js or index-wasm.js
function displayBackendStatus() {
  const status = document.createElement('div');
  status.id = 'backend-status';
  status.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #28a745;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-family: monospace;
    z-index: 9999;
  `;
  
  const backend = tf.getBackend();
  const features = {
    simd: WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,11])),
    threads: typeof SharedArrayBuffer !== 'undefined'
  };
  
  status.innerHTML = `
    Backend: ${backend.toUpperCase()}<br>
    SIMD: ${features.simd ? '✓' : '✗'}<br>
    Threads: ${features.threads ? '✓' : '✗'}
  `;
  
  document.body.appendChild(status);
}

// Call after TensorFlow.js is initialized
displayBackendStatus();
```

### 4.2 Performance Metrics Display
The app already shows FPS and detection time. With WASM:
- FPS should be 20-30+ (vs 5-10 with JS)
- Detection time should be <50ms (vs 200-400ms with JS)

## Method 5: Chrome DevTools WASM Debugging

1. Open Chrome DevTools
2. Go to Sources tab
3. Look for `wasm://` entries in the file tree
4. You'll see the loaded WASM modules

## Method 6: Backend Selector

The app includes a backend selector. To test different backends:

1. Look for backend dropdown in the UI
2. Switch between:
   - WASM (should be fastest on CPU)
   - WebGL (requires GPU)
   - CPU (pure JavaScript, slowest)
3. Compare performance metrics

## Method 7: Console Logging

Add detailed logging to `wasmBackend.js`:

```javascript
export async function initializeWASMBackend() {
  console.group('WASM Backend Initialization');
  console.log('Starting WASM backend setup...');
  
  const features = await detectWASMFeatures();
  console.log('WASM Features:', features);
  
  const threadConfig = await configureWASMThreads();
  console.log('Thread Configuration:', threadConfig);
  
  try {
    await tf.setBackend('wasm');
    await tf.ready();
    
    console.log('✅ WASM Backend Active');
    console.log('Backend:', tf.getBackend());
    console.log('TF.js Version:', tf.version.tfjs);
    
    // Test WASM performance
    const testTensor = tf.randomNormal([100, 100]);
    const start = performance.now();
    const result = tf.matMul(testTensor, testTensor);
    await result.data();
    const time = performance.now() - start;
    console.log(`WASM MatMul Test: ${time.toFixed(2)}ms`);
    
    testTensor.dispose();
    result.dispose();
  } catch (error) {
    console.error('❌ WASM Backend Failed:', error);
  }
  
  console.groupEnd();
}
```

## Method 8: System Requirements Check

Verify your system supports WASM:

```javascript
function checkWASMSupport() {
  const support = {
    wasm: typeof WebAssembly === 'object',
    instantiateStreaming: typeof WebAssembly.instantiateStreaming === 'function',
    simd: false,
    threads: typeof SharedArrayBuffer !== 'undefined',
    browser: navigator.userAgent
  };
  
  // SIMD feature detection
  try {
    support.simd = WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,11]));
  } catch (e) {}
  
  console.table(support);
  return support;
}

checkWASMSupport();
```

## Quick Verification Checklist

- [ ] Browser console shows `tf.getBackend()` returns "wasm"
- [ ] Network tab shows .wasm files being loaded
- [ ] Detection time is <50ms (vs 200-400ms for JS)
- [ ] FPS is 20-30+ (vs 5-10 for JS)
- [ ] Console shows "WASM Backend initialized successfully"
- [ ] Chrome DevTools Sources tab shows wasm:// modules
- [ ] Backend selector in UI shows "WASM" as selected

## Troubleshooting

If WASM is not working:

1. **Check Browser Compatibility**
   - Chrome 91+ or Firefox 89+ for SIMD
   - Any modern browser for basic WASM

2. **Check Console Errors**
   - Look for CORS errors (WASM files must be served with correct headers)
   - Check for SharedArrayBuffer errors (requires HTTPS and specific headers)

3. **Verify Build**
   - Ensure you're running the webpack build (not the public/index.html directly)
   - Check that @tensorflow/tfjs-backend-wasm is installed

4. **Force WASM Backend**
   ```javascript
   await tf.setBackend('wasm');
   await tf.ready();
   console.log('Forced backend:', tf.getBackend());
   ```

## Performance Benchmarks

Expected performance with WASM:

| Operation | JavaScript | WASM | WASM+SIMD |
|-----------|-----------|------|-----------|
| Face Detection | 200-400ms | 40-80ms | 20-50ms |
| Landmark Detection | 100-200ms | 20-40ms | 10-25ms |
| Expression Recognition | 50-100ms | 10-20ms | 5-15ms |
| FPS (Full Mode) | 2-5 | 10-15 | 15-25 |
| FPS (Lite Mode) | 5-10 | 20-30 | 30-40 |