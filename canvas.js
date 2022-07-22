class Canvas2D {
  constructor() {
    this.canvas = document.getElementById('screen');
    this.canvasContext = this.canvas.getContext('2d');
  }

  clear() {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawImage(image, position, origin, rotation = 0) {
    if (!position) {
      position = new Vector2();
    }

    if (!origin) {
      origin = new Vector2();
    }

    this.canvasContext.save();
    this.canvasContext.translate(position.x, position.y);
    this.canvasContext.rotate(rotation);
    this.canvasContext.drawImage(image, -origin.x, -origin.y);
    this.canvasContext.restore();
  }
}

const Canvas = new Canvas2D();
