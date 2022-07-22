const BALL_ORIGIN = new Vector2(25, 25);
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER / 2;
const HOLE_RADIUS = 46;

class Ball {
  constructor(position, color) {
    this.position = position;
    this.velocity = new Vector2();
    this.moving = false;
    this.color = color;
    this.visible = true;
    this.ConstantBalls = CONSTANTS.balls;

    // get ball sprite by its color
    this.sprite = getBallSpriteByColor(color);
    this.holes = [
      new Vector2(754, 64),
      new Vector2(750, 768),
      new Vector2(66, 64),
      new Vector2(1440, 64),
      new Vector2(66, 768),
      new Vector2(1440, 768),
    ];
  }

  // update method is called every frame (see detailed description in the dock)
  update(delta) {
    if (!this.visible) {
      return;
    }
    this.position.addTo(this.velocity.mult(delta));
    this.velocity = this.velocity.mult(0.984);
    if (this.velocity.length() < 5) {
      this.velocity = new Vector2();
      this.moving = false;
    }
    this.checkBoundary();
  }

  // draws sprite every frame
  draw() {
    if (!this.visible) {
      return;
    }
    Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
  }

  handleBallInHole() {
    if (!this.visible) {
      return;
    }
    let inHole = CONSTANTS.holes.some((hole) => {
      return this.position.distFrom(hole) < CONSTANTS.HOLE_RADIUS;
    });
    if (!inHole) {
      return;
    }
    this.visible = false;
    this.moving = false;
  }
  checkBoundary() {
    // normal angle that would be implemented in a pool game
    if (this.position.x <= 77) {
      this.position.x = 77;
      this.velocity.x *= -1;
    }
    if (this.position.y <= 77) {
      this.position.y = 77;
      this.velocity.y *= -1;
    }
    if (this.position.x >= 1430) {
      this.position.x = 1430;
      this.velocity.x *= -1;
    }
    if (this.position.y >= 747) {
      this.position.y = 747;
      this.velocity.y *= -1;
    }
  }

  shoot(power, rotation) {
    // console.log('shoot');
    this.velocity = new Vector2(
      power * Math.cos(rotation),
      power * Math.sin(rotation)
    );
    this.moving = true;
  }

  collideWith(ball) {
    if (!this.visible || !ball.visible) {
      return;
    }
    // Find a normal vector
    const n = this.position.subtract(ball.position);

    // Find the distance
    const distance = n.length();
    if (distance > BALL_DIAMETER) {
      return;
    }

    // Find minimum translation distance
    const ntd = n.mult((BALL_DIAMETER - distance) / distance);

    // push-pull balls apart
    this.position = this.position.add(ntd.mult(1 / 2));
    ball.position = ball.position.subtract(ntd.mult(1 / 2));

    // Find unit normal vector
    const un = n.mult(1 / n.length());

    // Find unit tangent vector
    const ut = new Vector2(-un.y, un.x);

    // Project velocities onto unit normal and unit tangent vectors.
    const v1n = un.dot(this.velocity);
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(ball.velocity);
    const v2t = ut.dot(ball.velocity);

    /// find new normal velocities

    let v1nTag = v2n;
    let v2nTag = v1n;

    // convert the scaler normal and tangential velocities into vectors

    v1nTag = un.mult(v1nTag);
    const v1tTag = ut.mult(v1t);
    v2nTag = un.mult(v2nTag);
    const v2tTag = ut.mult(v2t);

    // Update velocities
    this.velocity = v1nTag.add(v1tTag);
    ball.velocity = v2nTag.add(v2tTag);

    this.moving = true;
    ball.moving = true;
  }

  inHole(ball) {
    const n = this.holes.position.subtract(ball.position);

    // Find the distance
    const distance = n.length();
    if (distance > BALL_DIAMETER) {
      return;
    }
  }
}
