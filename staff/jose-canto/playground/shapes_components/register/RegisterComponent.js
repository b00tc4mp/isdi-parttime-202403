function LoginComponent() {
  Form.call(this)

  //this.removeClass("Form") // Eliminamos la clase "Form"
  this.addClass("RegisterForm")


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

  // Creamos una instancia de la clase Input para el campo de contraseña
  var passwordInput = new Input
  passwordInput.setText("")
  passwordInput.setId("password")
  passwordInput.setType("password")

  var submitButton = new SubmitButton("Register")


  // Agregamos los elementos al formulario

  this.add(usernameLabel)
  this.add(userNameInput)
  this.add(passwordLabel)
  this.add(passwordInput)
  this.add(submitButton)

}

LoginComponent.prototype = Object.create(Form.prototype)
LoginComponent.prototype.constructor = Form