function RegisterForm() {
    Form.call(this)

    this.addClass('RegisterForm')

    var nameField = new Field('name', 'text', 'Name')
    nameField.setPlaceholder('name')

    var surnameField = new Field('surname', 'text', 'Surname')
    surnameField.setPlaceholder('surname')

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
    feedbackPanel.addClass('Feedback')

    this.add(nameField)
    this.add(surnameField)
    this.add(emailField)
    this.add(usernameField)
    this.add(passwordField)
    this.add(passwordRepeatField)
    this.add(submitButton)
    this.add(feedbackPanel)

}

RegisterForm.prototype = Object.create(Form.prototype)
RegisterForm.prototype.constructor = RegisterForm

RegisterForm.prototype.getName = function () {
    var nameField = this.children[0]

    return nameField.getValue()
}

RegisterForm.prototype.getSurname = function () {
    var surnameField = this.children[1]

    return surnameField.getValue()
}

RegisterForm.prototype.getEmail = function () {
    var emailField = this.children[2]

    return emailField.getValue()
}

RegisterForm.prototype.getUsername = function () {
    var usernameField = this.children[3]

    return usernameField.getValue()
}

RegisterForm.prototype.getPassword = function () {
    var passwordField = this.children[4]

    return passwordField.getValue()
}

RegisterForm.prototype.getPasswordRepeat = function () {
    var passwordFieldRepeat = this.children[5]

    return passwordFieldRepeat.getValue()
}
RegisterForm.prototype.setFeedback = function (message, level) {
    var feedbackPanel = this.children[this.children.length - 1]

    if (level === 'success')
        feedbackPanel.addClass('success')

    feedbackPanel.setText(message)
}
RegisterForm.prototype.clear = function () {
    Form.prototype.clear.call(this)

    var feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText('')
    feedbackPanel.removeClass('success')
}