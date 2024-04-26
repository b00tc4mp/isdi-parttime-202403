function RegisterForm() {
    Form.call(this)

    this.addClass('RegisterForm')

    var emailField = new Field('email', 'email', 'E-mail')
    emailField.setPlaceholder('name@example.com')

    var usernameField = new Field('username', 'text', 'Username')
    usernameField.setPlaceholder('username')

    var passwordField = new Field('password', 'password', 'Password')
    passwordField.setPlaceholder('password')

    var passwordRepeatField = new Field('password', 'password', 'Password repeat')
    passwordRepeatField.setPlaceholder('repeat password')

    var submitButton = new SubmitButton('Register')

    var feedbackPanel = new Component('p')

    this.add(emailField)
    this.add(usernameField)
    this.add(passwordField)
    this.add(passwordRepeatField)
    this.add(submitButton)
    this.add(feedbackPanel)

}

RegisterForm.prototype = Object.create(Form.prototype)
RegisterForm.prototype.constructor = RegisterForm

RegisterForm.prototype.getEmail = function () {
    var emailField = this.children[0]

    return emailField.getValue()
}

RegisterForm.prototype.getUsername = function () {
    var usernameField = this.children[1]

    return usernameField.getValue()
}

RegisterForm.prototype.getPassword = function () {
    var passwordField = this.children[2]

    return passwordField.getValue()
}

RegisterForm.prototype.getPasswordRepeat = function () {
    var passwordFieldRepeat = this.children[3]

    return passwordFieldRepeat.getValue()
}
RegisterForm.prototype.setFeedback = function (message) {
    var feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText(message)

    feedbackPanel.addClass('Feedback')
}
RegisterForm.prototype.clear = function () {
    Form.prototype.clear.call(this)

    var feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText('')
}