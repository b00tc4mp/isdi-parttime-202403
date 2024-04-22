function RegisterComponent() {
  Form.call(this)

  //this.removeClass("Form") // Eliminamos la clase "Form"
  this.addClass("RegisterForm")

  //* EMAIL
  var EmailLabel = new Label() // Creamos una instancia de la clase Label para el campo de correo electrónico
  EmailLabel.setText("E-mail: ")
  EmailLabel.setFor("email")

  var EmailInput = new Input
  EmailInput.setId("email")
  EmailInput.setPlaceholder("User E-mail")
  EmailInput.setRequired()

  //* USERNAME
  var usernameLabel = new Label()
  usernameLabel.setText("Username: ")
  usernameLabel.setFor("username")

  var userNameInput = new Input
  userNameInput.setId("username")
  userNameInput.setPlaceholder("Username")
  userNameInput.setRequired()

  //* PASSWORD
  var passwordLabel = new Label()
  passwordLabel.setText("Password: ")
  passwordLabel.setFor("password")

  var passwordInput = new Input
  passwordInput.setText("")
  passwordInput.setId("password")
  passwordInput.setType("password")
  passwordInput.setPlaceholder("New Password")
  passwordInput.setRequired()


  //* PASSWORD REPEAT
  var passwordRepeatLabel = new Label()
  passwordRepeatLabel.setText("Password Repeat: ")
  passwordRepeatLabel.setFor("password")

  var passworRepeatdInput = new Input
  passworRepeatdInput.setText("")
  passworRepeatdInput.setId("passwordRepeat")
  passworRepeatdInput.setType("password")
  passworRepeatdInput.setPlaceholder("Repeat your Password")
  passworRepeatdInput.setRequired()


  var submitButton = new SubmitButton("Register")

  // Agregamos los elementos al formulario
  this.add(EmailLabel)
  this.add(EmailInput)
  this.add(usernameLabel)
  this.add(userNameInput)
  this.add(passwordLabel)
  this.add(passwordInput)
  this.add(passwordRepeatLabel)
  this.add(passworRepeatdInput)
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