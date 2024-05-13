class LoginForm extends Form {
  constructor() {
    super();
    this.removeClass("Form");
    this.addClass("LoginForm");

    const usernameField = new Field("username", "text", "Username");

    const passwordField = new Field("password", "password", "Password");

    const submitButton = new SubmitButton("Login");

    this.add(usernameField);
    this.add(passwordField);
    this.add(submitButton);

    this.onSubmit((event) => {
      event.preventDefault();

      const username = this.getUsername();
      const password = this.getPassword();

      this.onLoginSubmitListener(username, password);
    });
  }

  getUsername() {
    const usernameField = this.children[0];

    return usernameField.getValue();
  }

  getPassword() {
    const passwordField = this.children[1];

    return passwordField.getValue();
  }

  shakeButton() {
    const button = this.children[2];
    button.removeClass("SubmitButton");
    button.addClass("error");

    setTimeout(() => {
      button.removeClass("error");
      button.addClass("SubmitButton");
    }, 400);
  }

  success(message) {
    const successMessage = new Div();
    successMessage.addClass("success");
    successMessage.setText(message);

    this.add(successMessage);

    const successMessageElement = successMessage.getElement();

    setTimeout(() => {
      successMessageElement.parentNode.removeChild(successMessageElement);
    }, 5000);
  }

  clear() {
    Form.prototype.clear.call(this);
  }

  onLoginSubmit(listener) {
    this.onLoginSubmitListener = listener;
  }
}
