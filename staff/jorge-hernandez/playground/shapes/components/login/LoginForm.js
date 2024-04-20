function LoginForm() {
  Component.call(this, 'form')
  this.addClass('LoginForm')
  var heading = new Heading(1)
  heading.setText('Login')

  var userNameField = new Field('name', 'text', 'Name')
  userNameField.setPlaceholder('name')
  var passwordField = new Field('password', 'password', 'Password')
  passwordField.setPlaceholder('password')

  var button = new Button()
  button.setType('submit')
  button.setText('Login')

  this.add(heading)
  this.add(userNameField)
  this.add(passwordField)
  this.add(button)
}

LoginForm.prototype = Object.create(Component.prototype)
LoginForm.prototype.constructor = LoginForm
