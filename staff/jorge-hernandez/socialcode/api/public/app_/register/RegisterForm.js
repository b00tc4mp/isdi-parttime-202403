class RegisterForm extends FormWithFeedback {
  constructor() {
    super()
    this.addClass('RegisterForm')

    const heading = new Heading(1)
    heading.setText('Register')

    const nameField = new Field('name', 'text', 'Name')
    nameField.setPlaceholder('name')

    const surnameField = new Field('surname', 'text', 'Surname')
    surnameField.setPlaceholder('surname')

    const emailField = new Field('email', 'email', 'E-mail')
    emailField.setPlaceholder('email@email.com')

    const userNameField = new Field('name', 'text', 'Username')
    userNameField.setPlaceholder('name')

    const passwordField = new Field('password', 'password', 'Password')
    passwordField.setPlaceholder('password')

    const repeatPasswordField = new Field(
      'repeat-password',
      'password',
      'Repeat-password'
    )
    repeatPasswordField.setPlaceholder('repeat-password')

    const icon = new Component('i')
    icon.setId('icon')
    icon.addClass('fa-regular')
    icon.addClass('fa-eye-slash')
    icon.addClass('icon')

    const icon2 = new Component('i')
    icon2.setId('icon2')
    icon2.addClass('fa-regular')
    icon2.addClass('fa-eye-slash')
    icon2.addClass('icon2')

    const button = new Button()
    button.setType('submit')
    button.setText('Register')

    this.add(heading)
    this.add(nameField)
    this.add(surnameField)
    this.add(emailField)
    this.add(userNameField)
    this.add(passwordField)
    this.add(repeatPasswordField)
    this.add(icon)
    this.add(icon2)
    this.add(button)

    this.onSubmit(event => {
      event.preventDefault()

      const name = this.getName()
      const surname = this.getSurname()
      const email = this.getEmail()
      const username = this.getUsername()
      const password = this.getPassword()
      const passwordRepeat = this.getPasswordRepeat()

      try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
          if (error) {
            this.setFeedback(error.message + ', please, correct it')

            return
          }

          this.clear()

          this.setFeedback('user successfully registered', 'success')

          this.onRegisteredListener()
        })
      } catch (error) {
        if (error instanceof ContentError)
          this.setFeedback(error.message + ', please, correct it')
        else if (error instanceof MatchError)
          this.setFeedback(error.message + ', please, retype them')
        else if (error instanceof DuplicityError)
          this.setFeedback(error.message + ', please, enter new one')
        else
          this.setFeedback('sorry, there was an error, please try again later')
      }
    })
  }

  getName() {
    const nameField = this.children[1]
    return nameField.getValue()
  }

  getSurname() {
    const surnameField = this.children[2]
    return surnameField.getValue()
  }

  getEmail() {
    const emailField = this.children[3]
    return emailField.getValue()
  }
  getUsername() {
    const usernameField = this.children[4]
    return usernameField.getValue()
  }
  getPassword() {
    const passwordField = this.children[5]
    return passwordField.getValue()
  }
  getPasswordRepeat() {
    const repeatPasswordField = this.children[6]
    return repeatPasswordField.getValue()
  }

  onRegistered(listener) {
    this.onRegisteredListener = listener
  }
}
