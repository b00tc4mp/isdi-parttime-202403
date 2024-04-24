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
  var passwordField = new Field("password", "password", "password")
  passwordField.setPlaceholder("Password")

  //* PASSWORD REPEAT
  var repeatPassword = new Field("password", "password", "Password Repeat")
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
  var userEmail = this.container.querySelector("#email").value
  return userEmail
}

RegisterComponent.prototype.getPasswordRepeat = function () {
  var userPasswordRepeat = this.container.querySelector("#passwordRepeat").value
  return userPasswordRepeat
}


// RegisterComponent.prototype.setPasswordRepeat = function (userPassword, userPasswordRepeat) {

//   return userPassword === userPasswordRepeat
// }