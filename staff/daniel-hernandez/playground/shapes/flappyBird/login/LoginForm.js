function LoginForm() {
  Form.call(this);
  this.removeClass("Form");
  this.addClass("LoginForm");

  var usernameField = new Field("username", "text", "Username");

  var passwordField = new Field("password", "password", "Password");

  var submitButton = new SubmitButton("Login");

  this.add(usernameField);
  this.add(passwordField);
  this.add(submitButton);
}

LoginForm.prototype = Object.create(Form.prototype);
LoginForm.prototype.constructor = LoginForm;

LoginForm.prototype.getUsername = function () {
  var usernameField = this.children[0];

  return usernameField.getValue();
};

LoginForm.prototype.getPassword = function () {
  var passwordField = this.children[1];

  return passwordField.getValue();
};

LoginForm.prototype.shakeButton = function () {
  var button = this.children[2];

  button.removeClass("SubmitButton");
  button.addClass("error");
  setTimeout(function () {
    button.removeClass("error");
    button.addClass("SubmitButton");
  }, 400);
};

LoginForm.prototype.success = function (message) {
  var successMessage = new Div();
  successMessage.addClass("success");
  successMessage.setText(message);

  this.add(successMessage);

  var successMessageElement = successMessage.getElement();

  setTimeout(function () {
    successMessageElement.parentNode.removeChild(successMessageElement);
  }, 5000);
};

LoginForm.prototype.clear = function () {
  Form.prototype.clear.call(this);
};
