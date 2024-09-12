function LoginForm() {
    Form.call(this)

    // var form = new Form()
    //form.removeClass('Form')
    this.addClass('LoginForm')

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


    this.add(userNameLabel)
    this.add(userNameInput)
    this.add(passwordLabel)
    this.add(passwordInput)
    this.add(submitButton)

}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = Form