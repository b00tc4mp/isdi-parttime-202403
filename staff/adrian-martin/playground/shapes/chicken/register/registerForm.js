function LoginForm(){
    Form.call(this)

    this.addClass('registerForm')

    var emailField = new Field('email','email', 'E-mail')
    emailField.setPlaceholder('name@example.com')

    var usernameField = new Field('username','text', 'Username')
    usernameField.setPlaceholder('username')

    var passwordField = new Field('password','password', 'Password')
    passwordField.setPlaceholder('password')

    var passwordRetypeField = new Field('password','password', 'Repeat Password')
    passwordRetypeField.setPlaceholder('repeat password')


    var submitButton = new SubmitButton('Register')

    this.add(emailField)
    this.add(usernameField)
    this.add(passwordField)
    this.add(passwordRetypeField)
    this.add(submitButton)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = Form


