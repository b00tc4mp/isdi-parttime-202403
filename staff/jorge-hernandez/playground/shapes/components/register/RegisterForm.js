function RegisterForm() {
  Form.call(this)
  this.addClass('RegisterForm')

  var heading = new Heading(1)
  heading.setText('Register')

  var emailField = new Field('email', 'email', 'E-mail')
  emailField.setPlaceholder('email@email.com')

  var userNameField = new Field('name', 'text', 'Name')
  userNameField.setPlaceholder('name')

  var passwordField = new Field('password', 'password', 'Password')
  passwordField.setPlaceholder('password')

  var repeatPasswordField = new Field(
    'repeat-password',
    'password',
    'Repeat-password'
  )
  repeatPasswordField.setPlaceholder('repeat-password')

  var button = new Button()
  button.setType('submit')
  button.setText('Register')

  var feedbackPanel = new Component('p')
  feedbackPanel.addClass('Feedback')
  this.add(heading)
  this.add(emailField)
  this.add(userNameField)
  this.add(passwordField)
  this.add(repeatPasswordField)
  this.add(button)
  this.add(feedbackPanel)
}

RegisterForm.prototype = Object.create(Form.prototype)
RegisterForm.prototype.constructor = RegisterForm

RegisterForm.prototype.getEmail = function () {
  var emailField = this.children[1]
  return emailField.getValue()
}
RegisterForm.prototype.getUsername = function () {
  var usernameField = this.children[2]
  return usernameField.getValue()
}
RegisterForm.prototype.getPassword = function () {
  var passwordField = this.children[3]
  return passwordField.getValue()
}
RegisterForm.prototype.getRepeatPassword = function () {
  var repeatPasswordField = this.children[4]
  return repeatPasswordField.getValue()
}
RegisterForm.prototype.setFeedback = function (message) {
  var feedbackPanel = this.children[6]
  feedbackPanel.setText(message)
}
