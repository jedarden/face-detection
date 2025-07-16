const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve face-api.js models
app.use('/models', express.static(path.join(__dirname, 'node_modules/face-api.js/weights')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Catch all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Face Detection App server running on port ${PORT}`);
});