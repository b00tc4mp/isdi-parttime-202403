function LoginComponent() {
  Form.call(this)

  //this.removeClass("Form") // Eliminamos la clase "Form"
  this.addClass("LoginForm")

  var usernameField = new Field("username", "text", "Username")
  usernameField.setPlaceholder("Username")

  var passwordField = new Field("password", "password", "Password")
  passwordField.setPlaceholder("Password")


  var submitButton = new SubmitButton("Login")

  // Agregamos los elementos al formulario

  this.add(usernameField)
  this.add(passwordField)
  this.add(submitButton)
}

LoginComponent.prototype = Object.create(Form.prototype)
LoginComponent.prototype.constructor = Form