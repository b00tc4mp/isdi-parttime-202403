class SubmitButton extends Button {
  constructor(text) {
    super(text);
    this.removeClass("Button");
    this.addClass("SubmitButton");

    this.setType("submit");
  }
}
