class RegisterForm extends Form {
  constructor() {
    super();
    this.removeClass("Form");
    this.addClass("RegisterForm");

    const emailField = new Field("email", "email", "Email");

    const usernameField = new Field("username", "text", "Username");

    const passwordField = new Field("password", "password", "Password");

    const passwordConfirmField = new Field(
      "repeatedPassword",
      "password",
      "Confirm Password",
    );

    const submitButton = new SubmitButton("Register");

    this.add(emailField);
    this.add(usernameField);
    this.add(passwordField);
    this.add(passwordConfirmField);
    this.add(submitButton);
  }

  getEmail() {
    const emailField = this.children[0];
    return emailField.getValue();
  }

  getUsername() {
    const usernameField = this.children[1];

    return usernameField.getValue();
  }

  getPassword() {
    const passwordField = this.children[2];

    return passwordField.getValue();
  }

  getRepeatedPassword() {
    const repeatedPasswordField = this.children[3];

    return repeatedPasswordField.getValue();
  }

  shakeButton() {
    const button = this.children[4];

    button.removeClass("SubmitButton");
    button.addClass("error");
    setTimeout(() => {
      button.removeClass("error");
      button.addClass("SubmitButton");
    }, 400);
  }

  warnAll(message) {
    const warningMessage = new Div();
    warningMessage.addClass("warn");
    warningMessage.setText(message);

    this.add(warningMessage);

    const warningMessageElement = warningMessage.getElement();

    setTimeout(() => {
      warningMessageElement.parentNode.removeChild(warningMessageElement);
    }, 2000);
  }

  success(message) {
    const successMessage = new Div();
    successMessage.addClass("success");
    successMessage.setText(message);

    this.add(successMessage);

    const successMessageElement = successMessage.getElement();

    setTimeout(() => {
      successMessageElement.parentNode.removeChild(successMessageElement);
    }, 2000);
  }

  clear() {
    Form.prototype.clear.call(this);
  }
}
