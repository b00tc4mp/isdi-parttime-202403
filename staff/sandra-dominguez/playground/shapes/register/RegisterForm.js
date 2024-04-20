function RegisterForm() {
    Form.call(this)

    this.addClass('RegisterForm')

    var emailField = new Field('email', 'email', 'E-mail')
    emailField.setPlaceholder('name@example.com')

    var usernameField = new Field('nombre', 'text', 'Nombre')
    usernameField.setPlaceholder('nombre')

    var passwordField = new Field('contraseña', 'password', 'Contraseña')
    passwordField.setPlaceholder('contraseña')

    var passwordRepeatField = new Field('contraseña', 'password', 'Repetir contraseña')
    passwordRepeatField.setPlaceholder('repetir contraseña')

    var submitButton = new SubmitButton('Registrarse')

    this.add(emailField)
    this.add(usernameField)
    this.add(passwordField)
    this.add(passwordRepeatField)
    this.add(submitButton)
}

RegisterForm.prototype = Object.create(Form.prototype)
RegisterForm.prototype.contructor = RegisterForm

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