class RegisterComponent extends Form {
  constructor() {
    super()

    //this.removeClass("Form") // Eliminamos la clase "Form"
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

    //* FEEDBACK
    const feedbackPanel = new Component("p")
    feedbackPanel.addClass("Feedback")



    // Agregamos los elementos al formulario
    this.add(nameField)
    this.add(surnameField)
    this.add(emailField)
    this.add(userField)
    this.add(passwordField)
    this.add(repeatPassword)
    this.add(submitButton)
    this.add(feedbackPanel)

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

  setFeedback(message, level) {
    const feedbackPanel = this.children[this.children.length - 1]

    if (level === "success") {
      feedbackPanel.addClass("success")
    }
    feedbackPanel.setText(message)
  }

  clear() {
    super.clear()

    const feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText("")
    feedbackPanel.removeClass("success")
  }
}
