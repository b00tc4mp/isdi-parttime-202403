function LoginForm() {
    Form.call(this)

    // this.removeClass('Form')
    this.addClass('LoginForm')

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

    this.add(usernameLabel)
    this.add(usernameInput)
    this.add(passwordLabel)
    this.add(passwordInput)
    this.add(submitButton)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = Form