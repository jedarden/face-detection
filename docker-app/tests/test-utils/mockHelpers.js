// Mock helpers for face detection tests

export const mockMediaStream = {
  getTracks: jest.fn(() => [
    {
      kind: 'video',
      stop: jest.fn(),
      enabled: true
    }
  ]),
  getVideoTracks: jest.fn(() => [
    {
      stop: jest.fn(),
      enabled: true
    }
  ])
};

export const mockVideoElement = {
  srcObject: null,
  videoWidth: 640,
  videoHeight: 480,
  play: jest.fn(() => Promise.resolve()),
  pause: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  onloadedmetadata: null
};

export const mockCanvas = {
  width: 640,
  height: 480,
  getContext: jest.fn(() => mockCanvasContext)
};

export const mockCanvasContext = {
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  strokeRect: jest.fn(),
  fillText: jest.fn(),
  font: '',
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1
};

export const mockFaceDetection = {
  detection: {
    box: {
      x: 100,
      y: 100,
      width: 200,
      height: 200
    },
    score: 0.95
  },
  landmarks: {
    positions: Array(68).fill(0).map((_, i) => ({ x: i * 2, y: i * 3 }))
  },
  expressions: {
    happy: 0.8,
    sad: 0.1,
    angry: 0.05,
    neutral: 0.05
  },
  age: 25,
  gender: 'male',
  genderProbability: 0.92
};

export const mockFaceApiModels = {
  nets: {
    tinyFaceDetector: {
      loadFromUri: jest.fn(() => Promise.resolve())
    },
    faceLandmark68Net: {
      loadFromUri: jest.fn(() => Promise.resolve())
    },
    faceRecognitionNet: {
      loadFromUri: jest.fn(() => Promise.resolve())
    },
    faceExpressionNet: {
      loadFromUri: jest.fn(() => Promise.resolve())
    },
    ageGenderNet: {
      loadFromUri: jest.fn(() => Promise.resolve())
    }
  },
  detectAllFaces: jest.fn(() => ({
    withFaceLandmarks: jest.fn(() => ({
      withFaceExpressions: jest.fn(() => ({
        withAgeAndGender: jest.fn(() => Promise.resolve([mockFaceDetection]))
      }))
    }))
  })),
  TinyFaceDetectorOptions: jest.fn(),
  resizeResults: jest.fn((detections) => detections),
  draw: {
    drawDetections: jest.fn(),
    drawFaceLandmarks: jest.fn(),
    drawFaceExpressions: jest.fn()
  }
};

export const setupMockDOM = () => {
  document.body.innerHTML = `
    <div id="app"></div>
  `;
};

export const createMockNavigator = (hasCamera = true, cameras = []) => {
  const mockGetUserMedia = hasCamera
    ? jest.fn(() => Promise.resolve(mockMediaStream))
    : jest.fn(() => Promise.reject(new Error('Camera not available')));

  const mockEnumerateDevices = jest.fn(() => Promise.resolve(cameras.length > 0 ? cameras : [
    { kind: 'videoinput', deviceId: 'camera1', label: 'Default Camera', groupId: 'group1' }
  ]));

  global.navigator = {
    mediaDevices: {
      getUserMedia: mockGetUserMedia,
      enumerateDevices: mockEnumerateDevices
    }
  };

  return { mockGetUserMedia, mockEnumerateDevices };
};

export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

export const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

// Mock multiple cameras
export const mockMultipleCameras = [
  { kind: 'videoinput', deviceId: 'camera1', label: 'Front Camera', groupId: 'group1' },
  { kind: 'videoinput', deviceId: 'camera2', label: 'Back Camera', groupId: 'group2' },
  { kind: 'videoinput', deviceId: 'camera3', label: 'USB Camera', groupId: 'group3' }
];

export const mockSingleCamera = [
  { kind: 'videoinput', deviceId: 'camera1', label: 'Default Camera', groupId: 'group1' }
];