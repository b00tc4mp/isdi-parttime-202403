class LoginComponent extends FormWithFeedback {
  constructor() {
    super()

    //this.removeClass("Form") // Eliminamos la clase "Form"
    this.addClass("LoginForm")

    const usernameField = new Field("username", "text", "Username")
    usernameField.setPlaceholder("Username")

    const passwordField = new CheckPasswordField("password", "password", "Password")
    passwordField.setPlaceholder("Password")

    const submitButton = new SubmitButton("Login")

    // Agregamos los elementos al formulario
    this.add(usernameField)
    this.add(passwordField)
    this.add(submitButton)
  }

  getUsername() {
    const usernameField = this.children[0]
    return usernameField.getValue()
  }

  getPassword() {
    const passwordField = this.children[1]
    return passwordField.getValue()
  }

}