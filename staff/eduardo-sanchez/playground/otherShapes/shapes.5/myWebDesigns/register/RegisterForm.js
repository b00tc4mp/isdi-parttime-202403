function RegisterForm() {
    Form.call(this)

    this.addClass('RegisterForm')

    var emailField = new Field('email', 'email', 'E-mail')
    emailField.setPlaceholder('name@example.com')

    var userNameField = new Field('username', 'text', 'Username')
    userNameField.setPlaceholder('username')

    var passwordField = new Field('password', 'password', 'Password')
    passwordField.setPlaceholder('password')

    var passwordRepeatField = new Field('password', 'password', 'Password repeat')
    passwordRepeatField.setPlaceholder('repeat password')

    var submitButton = new SubmitButton('Register')

    //var submitButton = new Button()
    // submitButton.setText('Login')
    // submitButton.setType('submit')

    this.add(emailField)
    this.add(userNameField)
    this.add(passwordField)
    this.add(passwordRepeatField)
    this.add(submitButton)

}

RegisterForm.prototype = Object.create(Form.prototype)
RegisterForm.prototype.constructor = RegisterForm


RegisterForm.prototype.getEmail = function () {
    var emailField = this.children[0]

    return emailField.getValue()
}

RegisterForm.prototype.getUsername = function () {
    var userNameField = this.children[1]

    return userNameField.getValue()
}

RegisterForm.prototype.getPassword = function () {
    var passwordField = this.children[2]

    return passwordField.getValue()
}

RegisterForm.prototype.getPasswordRepeat = function () {
    var passwordRepeatField = this.children[3]

    return passwordRepeatField.getValue()
}
