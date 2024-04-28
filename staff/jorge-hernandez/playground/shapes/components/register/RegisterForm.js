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

  var icon = new Component('i')
  icon.setId('icon')
  icon.addClass('fa-regular')
  icon.addClass('fa-eye-slash')
  icon.addClass('icon')

  var icon2 = new Component('i')
  icon2.setId('icon2')
  icon2.addClass('fa-regular')
  icon2.addClass('fa-eye-slash')
  icon2.addClass('icon2')

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
  this.add(icon)
  this.add(icon2)
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
  var feedbackPanel = this.children[8]
  feedbackPanel.setText(message)
}
