describe('Face Detection App', () => {
  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = '<div id="app"></div>';
  });

  afterEach(() => {
    // Cleanup
    document.body.innerHTML = '';
  });

  test('should have app container', () => {
    const app = document.getElementById('app');
    expect(app).toBeTruthy();
  });

  test('should initialize with loading state', () => {
    const app = document.getElementById('app');
    app.innerHTML = '<div class="loading"><h2>Loading Face Detection App...</h2></div>';
    
    const loading = app.querySelector('.loading');
    expect(loading).toBeTruthy();
    expect(loading.textContent).toContain('Loading Face Detection App');
  });
});