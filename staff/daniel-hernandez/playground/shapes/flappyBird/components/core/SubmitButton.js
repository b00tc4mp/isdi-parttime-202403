function SubmitButton(text) {
    Button.call(this);

    this.removeClass('Button');
    this.addClass('SubmitButton');

    this.setType('submit');
    this.setText(text);
}

SubmitButton.prototype = Object.create(Button.prototype);
SubmitButton.prototype.constructor = SubmitButton;