var view = new Component(document.body)

var form = new Form
// form.removeClass('Form')
form.addClass('LoginForm')

var usernameLabel = new Label
usernameLabel.setText('Username')
usernameLabel.setFor('username')

var usernameInput = new Input
usernameInput.setId('username')

var passwordLabel = new Label
passwordLabel.setText('Password')
passwordLabel.setFor('password')

var passwordInput = new Input
passwordInput.setId('password')
passwordInput.setType('password')

var submitButton = new Button
submitButton.setText('Register')
submitButton.setType('submit')

form.add(usernameLabel)
form.add(usernameInput)
form.add(passwordLabel)
form.add(passwordInput)
form.add(submitButton)

view.add(form)