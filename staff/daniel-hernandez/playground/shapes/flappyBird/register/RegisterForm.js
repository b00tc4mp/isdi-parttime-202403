function RegisterForm() {
  Form.call(this);
  this.removeClass("Form");
  this.addClass("RegisterForm");

  var emailField = new Field("email", "email", "Email");

  var usernameField = new Field("username", "text", "Username");

  var passwordField = new Field("password", "password", "Password");

  var passwordConfirmField = new Field(
    "repeatedPassword",
    "password",
    "Confirm Password",
  );

  var submitButton = new SubmitButton("Register");

  this.add(emailField);
  this.add(usernameField);
  this.add(passwordField);
  this.add(passwordConfirmField);
  this.add(submitButton);
}

RegisterForm.prototype = Object.create(Form.prototype);
RegisterForm.prototype.constructor = RegisterForm;

RegisterForm.prototype.getEmail = function () {
  var emailField = this.children[0];
  return emailField.getValue();
};

RegisterForm.prototype.getUsername = function () {
  var usernameField = this.children[1];

  return usernameField.getValue();
};

RegisterForm.prototype.getPassword = function () {
  var passwordField = this.children[2];

  return passwordField.getValue();
};

RegisterForm.prototype.getRepeatedPassword = function () {
  var repeatedPasswordField = this.children[3];

  return repeatedPasswordField.getValue();
};

RegisterForm.prototype.shakeButton = function () {
  var button = this.children[4];

  button.removeClass("SubmitButton");
  button.addClass("error");
  setTimeout(function () {
    button.removeClass("error");
    button.addClass("SubmitButton");
  }, 400);
};

RegisterForm.prototype.warnAll = function (message) {
  var warningMessage = new Div();
  warningMessage.addClass("warn");
  warningMessage.setText(message);

  this.add(warningMessage);

  var warningMessageElement = warningMessage.getElement();

  setTimeout(function () {
    warningMessageElement.parentNode.removeChild(warningMessageElement);
  }, 2000);
};

RegisterForm.prototype.success = function (message) {
  var successMessage = new Div();
  successMessage.addClass("success");
  successMessage.setText(message);

  this.add(successMessage);

  var successMessageElement = successMessage.getElement();

  setTimeout(function () {
    successMessageElement.parentNode.removeChild(successMessageElement);
  }, 2000);
};

RegisterForm.prototype.clear = function () {
  Form.prototype.clear.call(this);
};
