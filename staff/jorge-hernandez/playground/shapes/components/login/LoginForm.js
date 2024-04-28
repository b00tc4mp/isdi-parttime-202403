function LoginForm() {
  Form.call(this, 'form')
  this.addClass('LoginForm')
  var heading = new Heading(1)
  heading.setText('Login')

  var userNameField = new Field('name', 'text', 'Name')
  userNameField.setPlaceholder('name')
  var passwordField = new Field('password', 'password', 'Password')
  passwordField.setPlaceholder('password')

  var icon = new Component('i')
  icon.setId('icon')

  icon.addClass('fa-regular')
  icon.addClass('fa-eye-slash')
  icon.addClass('icon')

  // icon.onclick = function showPass() {
  //   if (passField.type === 'text') {
  //     passField.type = 'password'
  //     icon.removeClass('fa-eye-slash')
  //     icon.addClass('fa-eye')
  //   } else if (passField.type === 'password') {
  //     passField.type = 'text'
  //     icon.removeClass('fa-eye-slash')
  //     icon.addClass('fa-eye')
  //   }
  // }
  var button = new Button()
  button.setType('submit')
  button.setText('Login')

  var feedbackPanel = new Component('p')
  feedbackPanel.addClass('Feedback')

  this.add(heading)
  this.add(userNameField)
  this.add(passwordField)
  this.add(icon)
  this.add(button)
  this.add(feedbackPanel)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = LoginForm

LoginForm.prototype.getUsername = function () {
  var usernameField = this.children[1]
  return usernameField.getValue()
}

LoginForm.prototype.getPassword = function () {
  var passwordField = this.children[2]
  return passwordField.getValue()
}

LoginForm.prototype.setFeedback = function (message) {
  var feedbackPanel = this.children[5]
  feedbackPanel.setText(message)
}
