module.exports = {
  launch: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  },
  server: {
    command: 'npm run build && npm start',
    port: 3000,
    launchTimeout: 30000,
    debug: true
  }
};