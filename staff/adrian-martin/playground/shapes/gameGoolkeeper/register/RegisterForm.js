function RegisterForm() {
    Form.call(this)

    this.addClass('RegisterForm')

    var emailField = new Field('email', 'email', 'E-mail')
    emailField.setPlaceholder('email@example.com')

    var usernameField = new Field('username','text', 'Username')
    usernameField.setPlaceholder('username')

    var passwordField = new Field('password', 'password', 'Password')
    passwordField.setPlaceholder('password')

    var passwordRepeatField = new Field('password', 'password', 'Repeat Password')
    passwordRepeatField.setPlaceholder('repeat password')

    var submitButton = new SubmitButton('Login')

    this.add(emailField)
    this.add(usernameField)
    this.add(passwordField)
    this.add(passwordRepeatField)
    this.add(submitButton)
}

RegisterForm.prototype = Object.create(Form.prototype)
RegisterForm.prototype.constructor = RegisterForm

RegisterForm.prototype.getEmail = function() {
    var emailField = this.children[0]

    return emailField.getValue()
}

RegisterForm.prototype.getUsername = function() {
    var usernameField = this.children[1]

    return usernameField.getValue()
}

RegisterForm.prototype.getPassword = function() {
    var passwordField = this.children[2]

    return passwordField.getValue()
}

RegisterForm.prototype.getRetypePassword = function() {
    var passwordRetypeField = this.children[3]

    return passwordRetypeField.getValue()
}
