class LoginComponent extends Form {
  constructor() {
    super()

    //this.removeClass("Form") // Eliminamos la clase "Form"
    this.addClass("LoginForm")

    const usernameField = new Field("username", "text", "Username")
    usernameField.setPlaceholder("Username")

    const passwordField = new CheckPasswordField("password", "password", "Password")
    passwordField.setPlaceholder("Password")

    const submitButton = new SubmitButton("Login")

    const feedbackPanel = new Component('p')
    feedbackPanel.addClass('Feedback')

    // Agregamos los elementos al formulario
    this.add(usernameField)
    this.add(passwordField)
    this.add(submitButton)
    this.add(feedbackPanel)
  }


  getUsername() {
    const usernameField = this.children[0]
    return usernameField.getValue()
  }

  getPassword() {
    const passwordField = this.children[1]
    return passwordField.getValue()
  }

  setFeedback(message, level) {
    const feedbackPanel = this.children[this.children.length - 1]

    if (level === "success")
      feedbackPanel.addClass("success")

    feedbackPanel.setText(message)
  }

  clear() {
    Form.prototype.clear.call(this)

    const feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText("")
    feedbackPanel.removeClass("success")
  }
}