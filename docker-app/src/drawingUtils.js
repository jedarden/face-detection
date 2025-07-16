export class DrawingUtils {
  constructor(canvas = null) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  clear() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBoundingBox(box, color = '#00ff00', lineWidth = 2) {
    if (!this.ctx) return;

    const { x, y, width, height } = box;
    
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeRect(x, y, width, height);
  }

  drawFilledBox(box, fillColor = 'rgba(0, 255, 0, 0.2)', borderColor = '#00ff00', borderWidth = 2) {
    if (!this.ctx) return;

    const { x, y, width, height } = box;
    
    // Fill
    this.ctx.fillStyle = fillColor;
    this.ctx.fillRect(x, y, width, height);
    
    // Border
    if (borderWidth > 0) {
      this.ctx.strokeStyle = borderColor;
      this.ctx.lineWidth = borderWidth;
      this.ctx.strokeRect(x, y, width, height);
    }
  }

  drawText(text, x, y, options = {}) {
    if (!this.ctx) return;

    const {
      color = '#ffffff',
      font = '16px Arial',
      align = 'left',
      baseline = 'top',
      backgroundColor = null,
      padding = 0,
      borderRadius = 0
    } = options;

    this.ctx.font = font;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;

    // Measure text for background
    const metrics = this.ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = parseInt(font); // Approximate height

    // Draw background if specified
    if (backgroundColor) {
      if (borderRadius > 0) {
        this.drawRoundedRect(
          x - padding,
          y - padding,
          textWidth + padding * 2,
          textHeight + padding * 2,
          borderRadius,
          backgroundColor
        );
      } else {
        this.ctx.fillStyle = backgroundColor;
        this.ctx.fillRect(
          x - padding,
          y - padding,
          textWidth + padding * 2,
          textHeight + padding * 2
        );
      }
    }

    // Draw text
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  }

  drawRoundedRect(x, y, width, height, radius, fillColor) {
    if (!this.ctx) return;

    this.ctx.fillStyle = fillColor;
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawPoint(x, y, radius = 3, color = '#ff0000') {
    if (!this.ctx) return;

    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  drawLine(x1, y1, x2, y2, color = '#00ff00', lineWidth = 1) {
    if (!this.ctx) return;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawPolygon(points, options = {}) {
    if (!this.ctx || !points || points.length < 3) return;

    const {
      fillColor = null,
      strokeColor = '#00ff00',
      lineWidth = 1,
      closed = true
    } = options;

    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    
    if (closed) {
      this.ctx.closePath();
    }

    if (fillColor) {
      this.ctx.fillStyle = fillColor;
      this.ctx.fill();
    }

    if (strokeColor && lineWidth > 0) {
      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = lineWidth;
      this.ctx.stroke();
    }
  }

  drawCircle(x, y, radius, options = {}) {
    if (!this.ctx) return;

    const {
      fillColor = null,
      strokeColor = '#00ff00',
      lineWidth = 1
    } = options;

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);

    if (fillColor) {
      this.ctx.fillStyle = fillColor;
      this.ctx.fill();
    }

    if (strokeColor && lineWidth > 0) {
      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = lineWidth;
      this.ctx.stroke();
    }
  }

  drawImage(image, x, y, width = null, height = null) {
    if (!this.ctx) return;

    if (width && height) {
      this.ctx.drawImage(image, x, y, width, height);
    } else {
      this.ctx.drawImage(image, x, y);
    }
  }

  setGlobalAlpha(alpha) {
    if (!this.ctx) return;
    this.ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  }

  save() {
    if (!this.ctx) return;
    this.ctx.save();
  }

  restore() {
    if (!this.ctx) return;
    this.ctx.restore();
  }

  measureText(text, font = '16px Arial') {
    if (!this.ctx) return { width: 0, height: 0 };
    
    const previousFont = this.ctx.font;
    this.ctx.font = font;
    const metrics = this.ctx.measureText(text);
    this.ctx.font = previousFont;
    
    return {
      width: metrics.width,
      height: parseInt(font) // Approximate height
    };
  }
}

export default DrawingUtils;