function RegisterForm() {
    Form.call(this)

    this.addClass('RegisterForm')

    var nameField = new Field('nombre', 'text', 'Nombre')
    nameField.setPlaceholder('nombre')

    var surnameField = new Field('apellido', 'text', 'Apellido')
    surnameField.setPlaceholder('nombre')

    var emailField = new Field('email', 'email', 'E-mail')
    emailField.setPlaceholder('name@example.com')

    var usernameField = new Field('nombre de usuario', 'text', 'Nombre de usuario')
    usernameField.setPlaceholder('nombre de usuario')

    var passwordField = new Field('contraseña', 'password', 'Contraseña')
    passwordField.setPlaceholder('contraseña')

    var passwordRepeatField = new Field('contraseña', 'password', 'Repetir contraseña')
    passwordRepeatField.setPlaceholder('repetir contraseña')

    var submitButton = new SubmitButton('Registrarse')

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
RegisterForm.prototype.contructor = RegisterForm

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