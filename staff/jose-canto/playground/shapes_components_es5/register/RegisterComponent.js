function RegisterComponent() {
  Form.call(this)

  //this.removeClass("Form") // Eliminamos la clase "Form"
  this.addClass("RegisterForm")


  var nameField = new Field("name", "text", "Name")
  nameField.setPlaceholder("Username")

  var surnameField = new Field("surname", "text", "Surname")
  surnameField.setPlaceholder("Username")


  //* EMAIL
  var emailField = new Field("email", "email", "E-mail")
  emailField.setPlaceholder("name@example.com")

  //* USERNAME
  var userField = new Field("user", "text", "Username")
  userField.setPlaceholder("Username")

  //* PASSWORD
  var passwordField = new CheckPasswordField("password", "password", "Password")
  passwordField.setPlaceholder("Password")

  //* PASSWORD REPEAT
  var repeatPassword = new Field("passwordRepeat", "password", "Password Repeat")
  repeatPassword.setPlaceholder("Repeat Password")
  repeatPassword.addClass("passwordRepeat")

  //* BUTTON
  var submitButton = new SubmitButton("Register")

  //* FEEDBACK
  var feedbackPanel = new Component("p")
  feedbackPanel.addClass("Feedback")



  // Agregamos los elementos al formulario
  this.add(nameField)
  this.add(surnameField)
  this.add(emailField)
  this.add(userField)
  this.add(passwordField)
  this.add(repeatPassword)
  this.add(submitButton)
  this.add(feedbackPanel)

}

RegisterComponent.prototype = Object.create(Form.prototype)
RegisterComponent.prototype.constructor = RegisterComponent


RegisterComponent.prototype.getName = function () {
  var nameField = this.children[0]
  return nameField.getValue()
}


RegisterComponent.prototype.getSurname = function () {
  var surnameField = this.children[1]
  return surnameField.getValue()
}


RegisterComponent.prototype.getEmail = function () {
  var emailField = this.children[2]
  return emailField.getValue()
}

RegisterComponent.prototype.getUsername = function () {
  var usernameField = this.children[3]
  return usernameField.getValue()
}

RegisterComponent.prototype.getPassword = function () {
  var passwordField = this.children[4]
  return passwordField.getValue()
}

RegisterComponent.prototype.getPasswordRepeat = function () {
  var repeatPasswordField = this.children[5]
  return repeatPasswordField.getValue()
}

RegisterComponent.prototype.setFeedback = function (message, level) {
  var feedbackPanel = this.children[this.children.length - 1]

  if (level === "success") {
    feedbackPanel.addClass("success")
  }
  feedbackPanel.setText(message)
}

RegisterComponent.prototype.clear = function () {
  Form.prototype.clear.call(this)

  var feedbackPanel = this.children[this.children.length - 1]

  feedbackPanel.setText("")
  feedbackPanel.removeClass("success")
}

