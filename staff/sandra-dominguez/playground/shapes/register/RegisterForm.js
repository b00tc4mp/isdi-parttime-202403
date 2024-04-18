function LoginForm() {
    Form.call(this)

    this.addClass('RegisterForm')

    var emailField = new Field('email', 'email', 'E-mail')

    var usernameField = new Field('nombre', 'text', 'Nombre')

    var passwordField = new Field('contraseña', 'password', 'Contraseña')

    var passwordRepeatField = new Field('contraseña', 'password', 'Repetir contraseña')

    var submitButton = new SubmitButton('Registrarse')

    this.add(emailField)
    this.add(usernameField)
    this.add(passwordField)
    this.add(passwordRepeatField)
    this.add(submitButton)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.contructor = Form