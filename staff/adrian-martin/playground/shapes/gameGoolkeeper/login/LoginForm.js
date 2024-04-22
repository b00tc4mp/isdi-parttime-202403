function LoginForm() {
    Form.call(this)

    this.addClass('LoginForm')

    var usernameField = new Field('username','text', 'Username')

    var passwordField = new Field('password', 'password', 'Password')

    var submitButton = new SubmitButton('Login')

    

    
    this.add(usernameField)
    this.add(passwordField)
    this.add(submitButton)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = Form