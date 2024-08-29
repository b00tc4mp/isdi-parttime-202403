function LoginComponent() {
  Form.call(this)

  //this.removeClass("Form") // Eliminamos la clase "Form"
  this.addClass("LoginForm")

  var usernameField = new Field("username", "text", "Username")
  usernameField.setPlaceholder("Username")

  var passwordField = new CheckPasswordField("password", "password", "Password")
  passwordField.setPlaceholder("Password")

  var submitButton = new SubmitButton("Login")

  var feedbackPanel = new Component('p')
  feedbackPanel.addClass('Feedback')

  // Agregamos los elementos al formulario
  this.add(usernameField)
  this.add(passwordField)
  this.add(submitButton)
  this.add(feedbackPanel)
}

LoginComponent.prototype = Object.create(Form.prototype)
LoginComponent.prototype.constructor = Form

LoginComponent.prototype.getUsername = function () {
  var usernameField = this.children[0]
  return usernameField.getValue()
}

LoginComponent.prototype.getPassword = function () {
  var passwordField = this.children[1]
  return passwordField.getValue()
}

LoginComponent.prototype.setFeedback = function (message, level) {
  var feedbackPanel = this.children[this.children.length - 1]

  if (level === "success")
    feedbackPanel.addClass("success")

  feedbackPanel.setText(message)
}

LoginComponent.prototype.clear = function () {
  Form.prototype.clear.call(this)

  var feedbackPanel = this.children[this.children.length - 1]

  feedbackPanel.setText("")
  feedbackPanel.removeClass("success")
}