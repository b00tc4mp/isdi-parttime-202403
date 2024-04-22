function LoginForm() {
    Form.call(this)

    this.addClass('LoginForm')

    var emailField = new Field('email', 'text', 'E-mail')

    var usernameField = new Field('username','text', 'Username')

    var passwordField = new Field('password', 'password', 'Password')

    var passwordRepeatField = new Field('password', 'password', 'Repeat Password')


    var submitButton = new SubmitButton('Login')

    this.add(emailField)
    this.add(usernameField)
    this.add(passwordField)
    this.add(passwordRepeatField)
    this.add(submitButton)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = Form