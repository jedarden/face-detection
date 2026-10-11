const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Liveness means the web server is responding, not that browser-side camera
// access or face models are ready.
app.get('/health', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Server-side performance metrics are not currently collected.
app.get('/metrics', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(404).json({ error: 'not_found', path: '/metrics' });
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve face-api.js models
app.use('/models', express.static(path.join(__dirname, 'node_modules/face-api.js/weights')));

// Catch all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Face Detection App server running on port ${PORT}`);
  });
}

module.exports = app;
