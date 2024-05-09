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

    this.onSubmit(event => {
      event.preventDefault()

      const username = this.getUsername()
      const password = this.getPassword()

      try {
        logic.loginUser(username, password)

        this.clear()

        this.onLoginSubmittedListener()

      } catch (error) {
        //alert(error.message)
        if (error instanceof ContentError) {
          this.setFeedback(error.message + ", please, correct it ❌")

        } else if (error instanceof MatchError) {
          this.setFeedback("❌ Wrong credentials ❌")

        } else {
          this.setFeedback("Please try again later ⌛")
        }
        setTimeout(() => this.clearFeedback(), 2000)
      }
    })
  }

  getUsername() {
    const usernameField = this.children[0]
    return usernameField.getValue()
  }

  getPassword() {
    const passwordField = this.children[1]
    return passwordField.getValue()
  }


  onLoginSubmitted(listener) {
    this.onLoginSubmittedListener = listener
  }
}