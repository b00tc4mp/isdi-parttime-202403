class Bird extends CollidableObject {
  constructor() {
    super(30, 30);

    this.removeClass("collision-block");
    this.addClass("bird");

    this.velocity = 0;
    this.velocityUp = 5;
    this.gravity = 0.1;
    this.previousFrame = 0;
    this.hasJumped = false;
  }

  jump() {
    this.velocity = -this.velocityUp;
    this.hasJumped = true;
  }
}
