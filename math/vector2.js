class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Vector2(this.x, this.y);
  }

  mult(scalar) {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  addTo(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  add(vector) {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector) {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  distanceFrom(vector) {
    return Math.sqrt(
      Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2)
    );
  }
  distFrom(vector) {
    return this.subtract(vector).length();
  }
}
