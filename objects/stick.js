const STICK_ORIGIN = new Vector2(970, 11);
const STICK_SHOT_ORIGIN = new Vector2(950, 11);
const MAX_POWER = 7500;

class Stick {
  constructor(position, onShoot) {
    this.position = position;
    this.origin = STICK_ORIGIN.copy();
    this.rotation = 0;
    this.power = 0;
    this.onShoot = onShoot;
    this.shot = false;
    this.visible = true;
  }

  // update method is called every frame (see detailed description in the dock)
  update(delta) {
    if (Mouse.left.down) {
      this.increasePower();
    } else if (this.power > 0) {
      this.shoot();
    }
    this.updateRotation();
  }

  // draws sprite every frame
  draw() {
    Canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);
  }
  updateRotation() {
    let opposite = Mouse.position.y - this.position.y;
    let adjacent = Mouse.position.x - this.position.x;

    this.rotation = Math.atan2(opposite, adjacent);
  }
  increasePower() {
    if (this.power > MAX_POWER) {
      return;
    }
    this.power += 120;
    this.origin.x += 5;
  }
  onShoot(power, rotation) {
    this.power = power;
    this.rotation = rotation;
  }
  shoot(power, rotation) {
    this.onShoot(this.power, this.rotation);
    this.power = 0;
    this.rotation = rotation;
    this.origin = STICK_SHOT_ORIGIN.copy();
    this.shot = true;
  }
  reposition(position) {
    this.position = position.copy();
    this.origin = STICK_ORIGIN.copy();
    this.shot = false;
  }
}
