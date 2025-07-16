// Mock for face-api.js
const mockFaceDetection = {
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

const mockDetectionChain = {
  withFaceLandmarks: jest.fn(() => ({
    withFaceExpressions: jest.fn(() => ({
      withAgeAndGender: jest.fn(() => Promise.resolve([mockFaceDetection]))
    }))
  }))
};

module.exports = {
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
  detectAllFaces: jest.fn(() => mockDetectionChain),
  detectSingleFace: jest.fn(() => mockDetectionChain),
  TinyFaceDetectorOptions: jest.fn(function(options) {
    return options || {};
  }),
  SsdMobilenetv1Options: jest.fn(function(options) {
    return options || {};
  }),
  resizeResults: jest.fn((detections, displaySize) => detections),
  draw: {
    drawDetections: jest.fn(),
    drawFaceLandmarks: jest.fn(),
    drawFaceExpressions: jest.fn(),
    DrawBox: jest.fn(),
    DrawTextField: jest.fn()
  },
  utils: {
    faceapi: {}
  },
  // Export mock data for tests to use
  __mockFaceDetection: mockFaceDetection,
  __mockDetectionChain: mockDetectionChain
};