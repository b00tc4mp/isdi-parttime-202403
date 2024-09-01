class Pipe extends CollidableObject {
  constructor(height, width) {
    super(height, width);

    this.removeClass("collision-block");
    this.addClass("pipe");
  }

  createTop() {
    this.removeClass("pipe");
    this.addClass("topPipe");
  }

  createBottom(gap) {
    this.removeClass("pipe");
    this.addClass("bottomPipe");
    this.setTopMargin(gap);
  }
}
