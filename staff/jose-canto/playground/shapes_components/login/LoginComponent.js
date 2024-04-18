function LoginComponent() {
  Form.call(this)

  //this.removeClass("Form") // Eliminamos la clase "Form"
  this.addClass("LoginForm")


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
  passworRepeatdInput.setId("Password")
  passworRepeatdInput.setType("password")
  passworRepeatdInput.setPlaceholder("Repeat your Password")


  var submitButton = new SubmitButton("Login")

  // Agregamos los elementos al formulario

  this.add(usernameLabel)
  this.add(userNameInput)
  this.add(passwordLabel)
  this.add(passwordInput)
  this.add(passwordRepeatLabel)
  this.add(passworRepeatdInput)
  this.add(submitButton)

}

LoginComponent.prototype = Object.create(Form.prototype)
LoginComponent.prototype.constructor = Form