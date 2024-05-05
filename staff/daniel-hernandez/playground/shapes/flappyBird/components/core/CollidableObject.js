class CollidableObject extends Div {
  constructor(height, width) {
    super();

    this.addClass("collision-block");
    this.setHeight(height);
    this.setWidth(width);
  }
}
