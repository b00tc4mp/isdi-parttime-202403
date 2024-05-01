class RegisterForm extends Form {
  constructor() {
    super()
    this.addClass('RegisterForm')

    const heading = new Heading(1)
    heading.setText('Register')

    const emailField = new Field('email', 'email', 'E-mail')
    emailField.setPlaceholder('email@email.com')

    const userNameField = new Field('name', 'text', 'Name')
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

    const feedbackPanel = new Component('p')
    feedbackPanel.addClass('Feedback')
    this.add(heading)
    this.add(emailField)
    this.add(userNameField)
    this.add(passwordField)
    this.add(repeatPasswordField)
    this.add(icon)
    this.add(icon2)
    this.add(button)
    this.add(feedbackPanel)
  }

  getEmail() {
    const emailField = this.children[1]
    return emailField.getValue()
  }
  getUsername() {
    const usernameField = this.children[2]
    return usernameField.getValue()
  }
  getPassword() {
    const passwordField = this.children[3]
    return passwordField.getValue()
  }
  getRepeatPassword() {
    const repeatPasswordField = this.children[4]
    return repeatPasswordField.getValue()
  }
  setFeedback(message) {
    const feedbackPanel = this.children[8]
    feedbackPanel.setText(message)
  }
}
