function RegisterComponent() {
  Form.call(this)

  //this.removeClass("Form") // Eliminamos la clase "Form"
  this.addClass("RegisterForm")



  var EmailLabel = new Label() // En las constructoras si no se le pasan argumentos, se crean vacías
  EmailLabel.setText("E-mail: ")
  EmailLabel.setFor("email")

  var EmailInput = new Input
  EmailInput.setId("email")
  EmailInput.setPlaceholder("User E-mail")


  // Creamos una instancia de la clase Label para el campo de nombre de usuario
  var usernameLabel = new Label() // En las constructoras si no se le pasan argumentos, se crean vacías
  usernameLabel.setText("Username: ")
  usernameLabel.setFor("username")

  // Creamos una instancia de la clase Label para el campo de contraseña
  var passwordLabel = new Label()
  passwordLabel.setText("Password: ")
  passwordLabel.setFor("password")

  // Creamos una instancia de la clase Input para el campo de nombre de usuario
  var userNameInput = new Input
  userNameInput.setId("username")
  userNameInput.setPlaceholder("User Name")

  // Creamos una instancia de la clase Input para el campo de contraseña
  var passwordInput = new Input
  passwordInput.setText("")
  passwordInput.setId("password")
  passwordInput.setType("password")
  passwordInput.setPlaceholder("Your Password")

  var passwordRepeatLabel = new Label()
  passwordRepeatLabel.setText("Password Repeat: ")
  passwordRepeatLabel.setFor("password")

  var passworRepeatdInput = new Input
  passworRepeatdInput.setText("")
  passworRepeatdInput.setId("passwordRepeat")
  passworRepeatdInput.setType("password")
  passworRepeatdInput.setPlaceholder("Repeat your Password")

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

RegisterComponent.prototype.getUsername = function () {
  var userName = this.container.querySelector("#username").value
  return userName
}

RegisterComponent.prototype.getPassword = function () {
  var userPassword = this.container.querySelector("#password").value
  return userPassword
}

RegisterComponent.prototype.getPasswordRepeat = function () {
  var userPasswordRepeat = this.container.querySelector("#passwordRepeat").value
  return userPasswordRepeat
}