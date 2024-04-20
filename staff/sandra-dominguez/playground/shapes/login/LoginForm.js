function LoginForm() {
    Form.call(this)

    this.addClass('LoginForm')

    var usernameField = new Field('nombre', 'text', 'Nombre')
    usernameField.setPlaceholder('nombre')

    var passwordField = new Field('contraseña', 'password', 'Contraseña')
    passwordField.setPlaceholder('contraseña')

    var submitButton = new SubmitButton('Aceptar')

    this.add(usernameField)
    this.add(passwordField)
    this.add(submitButton)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.contructor = Form