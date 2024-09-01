class SubmitButton extends Button {
  constructor(text) {
    super();
    this.removeClass("Button");
    this.addClass("SubmitButton");

    this.setType("submit");
    this.setText(text);
  }
}
