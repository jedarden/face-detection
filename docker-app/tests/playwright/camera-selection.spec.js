const { test, expect } = require('@playwright/test');

const CAMERAS = [
  { deviceId: 'front-camera', label: 'Front Camera', groupId: 'front-group' },
  { deviceId: 'back-camera', label: 'Back Camera', groupId: 'back-group' },
];

async function installCameraMock(page, { devices = CAMERAS, errorName = null } = {}) {
  await page.addInitScript(({ devices: configuredDevices, errorName: configuredError }) => {
    const devices = configuredDevices.map(device => ({ ...device, kind: 'videoinput' }));
    const calls = [];
    const streams = [];
    const sourceObjects = new WeakMap();

    function cameraError(name) {
      const error = new Error(`${name} from browser test mock`);
      error.name = name;
      return error;
    }

    function getUserMedia(constraints) {
      calls.push({ type: 'getUserMedia', constraints });

      if (configuredError) {
        return Promise.reject(cameraError(configuredError));
      }

      const requestedDeviceId = constraints?.video?.deviceId?.exact;
      const device = devices.find(candidate => candidate.deviceId === requestedDeviceId) || devices[0];

      if (!device) {
        return Promise.reject(cameraError('NotFoundError'));
      }

      const stream = { active: true };
      const track = {
        kind: 'video',
        label: device.label,
        readyState: 'live',
        stopCount: 0,
        stop() {
          this.stopCount += 1;
          this.readyState = 'ended';
          stream.active = false;
        },
        getSettings() {
          return {
            deviceId: device.deviceId,
            width: 640,
            height: 480,
            frameRate: 30,
            facingMode: 'user',
          };
        },
      };

      stream.getTracks = () => [track];
      stream.getVideoTracks = () => [track];
      streams.push({ streamId: streams.length, deviceId: device.deviceId, stream, track });
      return Promise.resolve(stream);
    }

    const mediaDevices = navigator.mediaDevices || {};
    Object.defineProperty(mediaDevices, 'getUserMedia', {
      configurable: true,
      value: getUserMedia,
    });
    Object.defineProperty(mediaDevices, 'enumerateDevices', {
      configurable: true,
      value: async () => devices,
    });
    if (!navigator.mediaDevices) {
      Object.defineProperty(navigator, 'mediaDevices', {
        configurable: true,
        value: mediaDevices,
      });
    }

    Object.defineProperty(HTMLMediaElement.prototype, 'srcObject', {
      configurable: true,
      get() {
        return sourceObjects.get(this) || null;
      },
      set(stream) {
        sourceObjects.set(this, stream);
        if (stream) {
          queueMicrotask(() => this.dispatchEvent(new Event('loadedmetadata')));
        }
      },
    });

    window.__cameraMock = {
      getSnapshot: () => ({
        calls: calls.map(call => ({
          ...call,
          constraints: structuredClone(call.constraints),
        })),
        streams: streams.map(({ streamId, deviceId, stream, track }) => ({
          streamId,
          deviceId,
          active: stream.active,
          stopCount: track.stopCount,
          readyState: track.readyState,
        })),
      }),
    };
  }, { devices, errorName });
}

async function openApp(page, cameraOptions) {
  await installCameraMock(page, cameraOptions);
  await page.goto('/');
  await page.waitForFunction(() => window.app && document.querySelector('#app'));
}

async function waitForCameraReady(page) {
  await page.waitForFunction(() => window.app && window.app.isVideoReady, null, { timeout: 30000 });
  await page.evaluate(() => window.app.stopDetection());
}

test.describe('Camera device and permission handling', () => {
  test('enumerates video devices and displays the camera selector', async ({ page }) => {
    await openApp(page, { devices: CAMERAS });
    await waitForCameraReady(page);

    const selector = page.locator('#camera-selector');
    const options = page.locator('#cameraSelect option');

    await expect(selector).toBeVisible();
    await expect(options).toHaveCount(2);
    await expect(options.nth(0)).toHaveText('Front Camera');
    await expect(options.nth(1)).toHaveText('Back Camera');
    await expect(page.locator('#cameraSelect')).toHaveValue('front-camera');

    const snapshot = await page.evaluate(() => window.__cameraMock.getSnapshot());
    expect(snapshot.calls.some(call => call.constraints.video?.facingMode === 'user')).toBe(true);
  });

  test('selects a different camera with an exact device constraint and stops the old stream', async ({ page }) => {
    await openApp(page, { devices: CAMERAS });
    await waitForCameraReady(page);

    const beforeSwitch = await page.evaluate(() => window.__cameraMock.getSnapshot());
    const activeFrontStream = beforeSwitch.streams.find(stream => stream.deviceId === 'front-camera' && stream.active);
    expect(activeFrontStream).toBeDefined();

    await page.locator('#cameraSelect').selectOption('back-camera');
    await expect.poll(async () => page.evaluate(() => window.app.currentCameraId)).toBe('back-camera');

    const snapshot = await page.evaluate(() => window.__cameraMock.getSnapshot());
    const switchCall = snapshot.calls.find(call => call.constraints.video?.deviceId?.exact === 'back-camera');
    const oldStream = snapshot.streams.find(stream => stream.streamId === activeFrontStream.streamId);
    const newStream = snapshot.streams.find(stream => stream.deviceId === 'back-camera' && stream.active);

    expect(switchCall).toBeDefined();
    expect(oldStream.stopCount).toBeGreaterThan(0);
    expect(newStream).toBeDefined();
  });

  test('renders a controlled error when camera permission is denied', async ({ page }) => {
    await openApp(page, { devices: [], errorName: 'NotAllowedError' });

    await expect(page.locator('#app .error')).toBeVisible();
    await expect(page.locator('#app .error')).toContainText('camera permissions');
    expect(await page.evaluate(() => window.app.isVideoReady)).toBe(false);

    const snapshot = await page.evaluate(() => window.__cameraMock.getSnapshot());
    expect(snapshot.calls.some(call => call.constraints.video)).toBe(true);
    expect(snapshot.streams).toHaveLength(0);
  });

  test('renders a controlled error when no camera is available', async ({ page }) => {
    await openApp(page, { devices: [], errorName: 'NotFoundError' });

    await expect(page.locator('#app .error')).toBeVisible();
    await expect(page.locator('#app .error')).toContainText('camera permissions');
    expect(await page.evaluate(() => window.app.isVideoReady)).toBe(false);

    const snapshot = await page.evaluate(() => window.__cameraMock.getSnapshot());
    expect(snapshot.calls.some(call => call.constraints.video)).toBe(true);
    expect(snapshot.streams).toHaveLength(0);
  });

  test('stops every track and clears the video source during stream cleanup', async ({ page }) => {
    await openApp(page, { devices: CAMERAS });
    await waitForCameraReady(page);

    await page.evaluate(async () => {
      await window.app.cameraManager.stopCamera();
    });

    const cleanup = await page.evaluate(() => ({
      sourceCleared: document.querySelector('#video').srcObject === null,
      streamActive: window.app.cameraManager.isStreamActive(),
      snapshot: window.__cameraMock.getSnapshot(),
    }));

    expect(cleanup.sourceCleared).toBe(true);
    expect(cleanup.streamActive).toBe(false);
    expect(cleanup.snapshot.streams.filter(stream => stream.stopCount > 0)).not.toHaveLength(0);
    expect(cleanup.snapshot.streams.every(stream => stream.readyState === 'ended')).toBe(true);
  });
});
