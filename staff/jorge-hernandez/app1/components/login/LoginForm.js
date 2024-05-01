class LoginForm extends Form {
  constructor() {
    super('form')
    this.addClass('LoginForm')
    const heading = new Heading(1)
    heading.setText('Login')

    const userNameField = new Field('name', 'text', 'Name')
    userNameField.setPlaceholder('name')
    const passwordField = new Field('password', 'password', 'Password')
    passwordField.setPlaceholder('password')

    const icon = new Component('i')
    icon.setId('icon')

    icon.addClass('fa-regular')
    icon.addClass('fa-eye-slash')
    icon.addClass('icon')

    const button = new Button()
    button.setType('submit')
    button.setText('Login')

    const feedbackPanel = new Component('p')
    feedbackPanel.addClass('Feedback')

    this.add(heading)
    this.add(userNameField)
    this.add(passwordField)
    this.add(icon)
    this.add(button)
    this.add(feedbackPanel)
  }

  getUsername() {
    const usernameField = this.children[1]
    return usernameField.getValue()
  }

  getPassword() {
    const passwordField = this.children[2]
    return passwordField.getValue()
  }

  setFeedback(message) {
    const feedbackPanel = this.children[5]
    feedbackPanel.setText(message)
  }
}
