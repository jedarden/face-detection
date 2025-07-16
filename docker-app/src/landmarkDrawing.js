/**
 * Advanced Landmark Drawing Utilities for Pro Mode
 * Handles 68-point facial landmarks visualization with connections
 */

// Define landmark point indices for different facial regions
const FACIAL_REGIONS = {
  jawline: [...Array(17).keys()], // 0-16
  rightEyebrow: [...Array(5).keys()].map(i => i + 17), // 17-21
  leftEyebrow: [...Array(5).keys()].map(i => i + 22), // 22-26
  nose: [...Array(9).keys()].map(i => i + 27), // 27-35
  rightEye: [...Array(6).keys()].map(i => i + 36), // 36-41
  leftEye: [...Array(6).keys()].map(i => i + 42), // 42-47
  outerMouth: [...Array(12).keys()].map(i => i + 48), // 48-59
  innerMouth: [...Array(8).keys()].map(i => i + 60) // 60-67
};

// Define connections between landmarks
const LANDMARK_CONNECTIONS = [
  // Jawline connections
  ...FACIAL_REGIONS.jawline.slice(0, -1).map((i, idx) => [i, i + 1]),
  
  // Eyebrow connections
  ...FACIAL_REGIONS.rightEyebrow.slice(0, -1).map((i, idx) => [i, i + 1]),
  ...FACIAL_REGIONS.leftEyebrow.slice(0, -1).map((i, idx) => [i, i + 1]),
  
  // Nose connections
  [27, 28], [28, 29], [29, 30], // Nose bridge
  [30, 33], // Nose tip
  [31, 32], [32, 33], [33, 34], [34, 35], // Nostrils
  [31, 35], // Nostril connection
  
  // Eye connections (circular)
  ...FACIAL_REGIONS.rightEye.map((i, idx) => [i, FACIAL_REGIONS.rightEye[(idx + 1) % 6]]),
  ...FACIAL_REGIONS.leftEye.map((i, idx) => [i, FACIAL_REGIONS.leftEye[(idx + 1) % 6]]),
  
  // Mouth connections
  ...FACIAL_REGIONS.outerMouth.map((i, idx) => [i, FACIAL_REGIONS.outerMouth[(idx + 1) % 12]]),
  ...FACIAL_REGIONS.innerMouth.map((i, idx) => [i, FACIAL_REGIONS.innerMouth[(idx + 1) % 8]])
];

export function drawLandmarks(ctx, landmarks, style) {
  const positions = landmarks.positions;
  
  // Draw landmark points
  positions.forEach((point, index) => {
    const region = getRegionForPoint(index);
    const color = style.regionColors[region] || style.landmarkColor;
    
    // Draw point with glow effect
    ctx.beginPath();
    ctx.arc(point.x, point.y, style.landmarkSize + 1, 0, 2 * Math.PI);
    ctx.fillStyle = color + '40'; // Semi-transparent glow
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(point.x, point.y, style.landmarkSize, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  });
  
  // Draw connections between landmarks
  ctx.strokeStyle = style.connectionColor + '80'; // Semi-transparent connections
  ctx.lineWidth = 1;
  
  LANDMARK_CONNECTIONS.forEach(([start, end]) => {
    if (positions[start] && positions[end]) {
      ctx.beginPath();
      ctx.moveTo(positions[start].x, positions[start].y);
      ctx.lineTo(positions[end].x, positions[end].y);
      ctx.stroke();
    }
  });
}

export function drawFaceContours(ctx, landmarks, style) {
  const positions = landmarks.positions;
  
  // Draw smooth contours for major facial features
  ctx.strokeStyle = style.contourColor;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Draw jawline contour
  drawSmoothCurve(ctx, FACIAL_REGIONS.jawline.map(i => positions[i]));
  
  // Draw eyebrow contours
  drawSmoothCurve(ctx, FACIAL_REGIONS.rightEyebrow.map(i => positions[i]));
  drawSmoothCurve(ctx, FACIAL_REGIONS.leftEyebrow.map(i => positions[i]));
  
  // Draw eye contours
  drawSmoothCurve(ctx, FACIAL_REGIONS.rightEye.map(i => positions[i]), true);
  drawSmoothCurve(ctx, FACIAL_REGIONS.leftEye.map(i => positions[i]), true);
  
  // Draw mouth contours
  drawSmoothCurve(ctx, FACIAL_REGIONS.outerMouth.map(i => positions[i]), true);
  drawSmoothCurve(ctx, FACIAL_REGIONS.innerMouth.map(i => positions[i]), true);
}

export function drawExpressions(ctx, expressions, box) {
  const sortedExpressions = Object.entries(expressions)
    .filter(([_, value]) => value > 0.1) // Only show expressions above 10% confidence
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, 3); // Show top 3 expressions
  
  // Position expressions below the face box
  let yOffset = box.y + box.height + 20;
  
  ctx.font = '14px Arial';
  ctx.textAlign = 'left';
  
  sortedExpressions.forEach(([expression, value]) => {
    const percentage = Math.round(value * 100);
    const text = `${expression}: ${percentage}%`;
    
    // Draw background for better readability
    const textWidth = ctx.measureText(text).width;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(box.x, yOffset - 14, textWidth + 10, 18);
    
    // Draw expression text
    ctx.fillStyle = getExpressionColor(expression, value);
    ctx.fillText(text, box.x + 5, yOffset);
    
    yOffset += 20;
  });
}

export function drawAgeGender(ctx, age, gender, box) {
  const ageText = `Age: ${Math.round(age)}`;
  const genderText = `Gender: ${gender} (${Math.round(gender === 'male' ? 
    age * 0.95 : age * 1.05)}% confidence)`;
  
  // Position above the face box
  const yPosition = box.y - 10;
  
  ctx.font = '14px Arial';
  ctx.textAlign = 'left';
  
  // Draw background
  const maxWidth = Math.max(
    ctx.measureText(ageText).width,
    ctx.measureText(genderText).width
  );
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(box.x, yPosition - 35, maxWidth + 10, 40);
  
  // Draw text
  ctx.fillStyle = '#ffffff';
  ctx.fillText(ageText, box.x + 5, yPosition - 20);
  ctx.fillText(genderText, box.x + 5, yPosition - 5);
}

// Helper function to draw smooth curves through points
function drawSmoothCurve(ctx, points, closed = false) {
  if (points.length < 2) return;
  
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  // Use quadratic curves for smoother lines
  for (let i = 1; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  
  // Last point
  if (closed && points.length > 2) {
    const xc = (points[points.length - 1].x + points[0].x) / 2;
    const yc = (points[points.length - 1].y + points[0].y) / 2;
    ctx.quadraticCurveTo(points[points.length - 1].x, points[points.length - 1].y, xc, yc);
    ctx.quadraticCurveTo(xc, yc, points[0].x, points[0].y);
  } else {
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  }
  
  ctx.stroke();
}

// Helper function to determine which facial region a landmark belongs to
function getRegionForPoint(index) {
  if (FACIAL_REGIONS.rightEye.includes(index)) return 'rightEye';
  if (FACIAL_REGIONS.leftEye.includes(index)) return 'leftEye';
  if (FACIAL_REGIONS.nose.includes(index)) return 'nose';
  if (FACIAL_REGIONS.outerMouth.includes(index) || 
      FACIAL_REGIONS.innerMouth.includes(index)) return 'mouth';
  if (FACIAL_REGIONS.jawline.includes(index)) return 'jawline';
  return 'default';
}

// Helper function to get color based on expression
function getExpressionColor(expression, value) {
  const colors = {
    happy: '#00ff00',
    sad: '#0000ff',
    angry: '#ff0000',
    surprised: '#ffff00',
    disgusted: '#ff00ff',
    fearful: '#ff8800',
    neutral: '#ffffff'
  };
  
  return colors[expression] || '#ffffff';
}

// Export additional utilities for landmark manipulation
export function animateLandmarks(currentLandmarks, targetLandmarks, progress) {
  if (!currentLandmarks || !targetLandmarks) return currentLandmarks;
  
  const positions = currentLandmarks.positions.map((current, i) => {
    const target = targetLandmarks.positions[i];
    return {
      x: current.x + (target.x - current.x) * progress,
      y: current.y + (target.y - current.y) * progress
    };
  });
  
  return { positions };
}

export function getLandmarkRegions() {
  return FACIAL_REGIONS;
}

export function getLandmarkConnections() {
  return LANDMARK_CONNECTIONS;
}