const DELTA = 1 / 177;

class GameWorld {
  constructor() {
    // create the ball
    this.balls = CONSTANTS.balls.map((params) => new Ball(...params));
    // this.balls = [
    //   [new Vector2(1022, 413), Color.yellow],
    //   [new Vector2(1056, 433), Color.red],
    //   [new Vector2(1056, 393), Color.red],
    //   [new Vector2(1090, 374), Color.yellow],
    //   [new Vector2(1090, 413), Color.black],
    //   [new Vector2(1090, 452), Color.yellow],
    //   [new Vector2(1126, 393), Color.red],
    //   [new Vector2(1126, 433), Color.red],
    //   [new Vector2(1162, 413), Color.yellow],
    //   [new Vector2(413, 413), Color.white],
    // ].map((params) => new Ball(...params));
    this.ball = this.balls.find((ball) => ball.color === Color.white);

    // create the stick
    this.stick = new Stick(
      new Vector2(413, 413),
      this.ball.shoot.bind(this.ball)
    );

    // create the table
    this.table = new Table();
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
  update() {
    this.handleCollision();
    this.tracingPath();

    // updating objects created in the constructor
    this.table.update(DELTA);
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].update(DELTA);
    }
    this.ball.update(DELTA);
    if (!this.ballsMoving()) {
      this.stick.update(DELTA);
    }
    if (!this.ballsMoving() && this.stick.shot) {
      this.stick.reposition(this.ball.position);
    }
  }

  // draws sprite every frame
  draw() {
    // updating objects created in the constructor
    this.table.draw();
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].draw();
    }

    this.tracingPath();
    this.stick.draw();
  }
  ballsMoving() {
    let ballsMoving = false;
    for (let i = 0; i < this.balls.length; i++) {
      if (this.balls[i].moving) {
        ballsMoving = true;
        break;
      }
    }
    return ballsMoving;
  }
  handleCollision() {
    for (let i = 0; i < this.balls.length; i++) {
      {
        this.balls[i].handleBallInHole();
        for (let j = i + 1; j < this.balls.length; j++) {
          const firstBall = this.balls[i];
          const secondBall = this.balls[j];
          firstBall.collideWith(secondBall);
        }
      }
    }
  }

  tracingPath() {
    if (this.ball.visible) {
      const canvas = Canvas.canvasContext;
      if (this.stick.power <= 2500) {
        canvas.strokeStyle = 'rgb(255, 255, 255)';
      } else if (this.stick.power > 2500 && this.stick.power <= 5000) {
        canvas.strokeStyle = 'rgb(255,114,118)';
      } else {
        canvas.strokeStyle = 'rgb(206,32,41)';
      }
      canvas.lineWidth = 2;
      if (!this.ballsMoving() && this.ball.visible) {
        // draw a red line
        canvas.beginPath();
        canvas.moveTo(this.ball.position.x, this.ball.position.y);
        canvas.lineTo(Mouse.position.x, Mouse.position.y);
        canvas.stroke();
      }
    }
  }
}
