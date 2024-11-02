function LoginForm() {
    Form.call(this)

    this.addClass('LoginForm')

    var userNameField = new Field('username', 'text', 'Username')


    var passwordField = new Field('password', 'password', 'Password')

    var submitButton = new SubmitButton('Login')


    //var submitButton = new Button()
    // submitButton.setText('Login')
    // submitButton.setType('submit')

    this.add(userNameField)
    this.add(passwordField)
    this.add(submitButton)

}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = LoginForm