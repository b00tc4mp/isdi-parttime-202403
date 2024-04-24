function RegisterComponent() {
  Form.call(this)

  //this.removeClass("Form") // Eliminamos la clase "Form"
  this.addClass("RegisterForm")

  //* EMAIL
  var emailField = new Field("email", "email", "E-mail")
  emailField.setPlaceholder("name@example.com")


  //* USERNAME
  var userField = new Field("user", "user", "Username")
  userField.setPlaceholder("Username")


  //* PASSWORD
  var passwordField = new Field("password", "password", "Password")
  passwordField.setPlaceholder("Password")

  //* PASSWORD REPEAT
  var repeatPassword = new Field("passwordRepeat", "password", "Password Repeat")
  repeatPassword.setPlaceholder("Repeat Password")


  //* Button
  var submitButton = new SubmitButton("Register")

  // Agregamos los elementos al formulario
  this.add(emailField)
  this.add(userField)
  this.add(passwordField)
  this.add(repeatPassword)
  this.add(submitButton)
}

RegisterComponent.prototype = Object.create(Form.prototype)
RegisterComponent.prototype.constructor = RegisterComponent

RegisterComponent.prototype.getEmail = function () {
  var emailField = this.children[0]
  return emailField.getValue()
}

RegisterComponent.prototype.getUsername = function () {
  var usernameField = this.children[1]
  return usernameField.getValue()
}

RegisterComponent.prototype.getPassword = function () {
  var passwordField = this.children[2]
  return passwordField.getValue()
}

RegisterComponent.prototype.getPasswordRepeat = function () {
  var repeatPasswordField = this.children[3]
  return repeatPasswordField.getValue()
}


