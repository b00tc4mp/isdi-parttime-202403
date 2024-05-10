class RegisterComponent extends FormWithFeedback {
  constructor() {
    super()

    this.addClass("RegisterForm")

    const nameField = new Field('name', 'text', 'Name')
    nameField.setPlaceholder('name')

    const surnameField = new Field('surname', 'text', 'Surname')
    surnameField.setPlaceholder('surname')

    //* EMAIL
    const emailField = new Field("email", "email", "E-mail")
    emailField.setPlaceholder("name@example.com")

    //* USERNAME
    const userField = new Field("user", "text", "Username")
    userField.setPlaceholder("Username")

    //* PASSWORD
    const passwordField = new CheckPasswordField("password", "password", "Password")
    passwordField.setPlaceholder("Password")

    //* PASSWORD REPEAT
    const repeatPassword = new Field("passwordRepeat", "password", "Password Repeat")
    repeatPassword.setPlaceholder("Repeat Password")
    repeatPassword.addClass("passwordRepeat")

    //* BUTTON
    const submitButton = new SubmitButton("Register")


    this.add(nameField)
    this.add(surnameField)
    this.add(emailField)
    this.add(userField)
    this.add(passwordField)
    this.add(repeatPassword)
    this.add(submitButton)

    this.onSubmit(event => {
      event.preventDefault()

      const name = this.getName()
      const surname = this.getSurname()
      const email = this.getEmail()
      const username = this.getUsername()
      const password = this.getPassword()
      const passwordRepeat = this.getPasswordRepeat()

      try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat)

        this.clear()

        this.onRegisterSubmittedListener()

      } catch (error) {
        if (error instanceof ContentError) {

          this.setFeedback(error.message + ", correct it ❌")

        } else if (error instanceof MatchError) {
          this.setFeedback(error.message + ", please, retype them ❌")

        } else if (error instanceof DuplicityError) {
          this.setFeedback(error.message + ", enter new one ❌")

        } else {
          this.setFeedback("❌ Sorry, ther was an error, please try again later ❌")
        }
        setTimeout(() => this.clearFeedback(), 2000)
      }
    })

  }

  getName() {
    const nameField = this.children[0]

    return nameField.getValue()
  }

  getSurname() {
    const surnameField = this.children[1]

    return surnameField.getValue()
  }

  getEmail() {
    const emailField = this.children[2]
    return emailField.getValue()
  }

  getUsername() {
    const usernameField = this.children[3]

    return usernameField.getValue()
  }

  getPassword() {
    const passwordField = this.children[4]

    return passwordField.getValue()
  }

  getPasswordRepeat() {
    const repeatPasswordField = this.children[5]

    return repeatPasswordField.getValue()
  }

  onRegisterSubmitted(listener) {
    this.onRegisterSubmittedListener = listener
  }
}
