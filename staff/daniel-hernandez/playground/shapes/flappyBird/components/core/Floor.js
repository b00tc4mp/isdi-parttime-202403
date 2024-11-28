class Floor extends CollidableObject {
  constructor() {
    super(10, 450);

    this.removeClass("collision-block");
    this.addClass("floor");
  }
}
