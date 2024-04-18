var view = new Component(document.body)


var form = new Form()

form.addClass('LoginForm')

var userNameLabel = new Label()
userNameLabel.setText('Username')
userNameLabel.setFor('username')


var userNameInput = new Input()
userNameInput.setId('username')

var passwordLabel = new Label()
passwordLabel.setText('Password')
passwordLabel.setFor('password')

var passwordInput = new Input()
passwordInput.setId('password')
passwordInput.setType('password')

var submitButton = new Button()
submitButton.setText('Register')
submitButton.setType('submit')


form.add(userNameLabel)
form.add(userNameInput)
form.add(passwordLabel)
form.add(passwordInput)
form.add(submitButton)


view.add(form)