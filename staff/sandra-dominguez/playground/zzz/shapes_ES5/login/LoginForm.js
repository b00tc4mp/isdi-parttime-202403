function LoginForm() {
    Form.call(this)

    this.addClass('LoginForm')

    var usernameField = new Field('nombre de usuario', 'text', 'Nombre de usuario')
    usernameField.setPlaceholder('nombre de usuario')

    var passwordField = new Field('contraseña', 'password', 'Contraseña')
    passwordField.setPlaceholder('contraseña')

    var submitButton = new SubmitButton('Aceptar')

    var feedbackPanel = new Component('p')
    feedbackPanel.addClass('Feedback')

    this.add(usernameField)
    this.add(passwordField)
    this.add(submitButton)
    this.add(feedbackPanel)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.contructor = Form

LoginForm.prototype.getUsername = function () {
    var usernameField = this.children[0]

    return usernameField.getValue()
}

LoginForm.prototype.getPassword = function () {
    var passwordField = this.children[1]

    return passwordField.getValue()
}

LoginForm.prototype.setFeedback = function (message, level) {
    var feedbackPanel = this.children[this.children.length - 1]

    if (level === 'success')
        feedbackPanel.addClass('success')

    feedbackPanel.setText(message)
}

LoginForm.prototype.clear = function () {
    Form.prototype.clear.call(this)

    var feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText('')
    feedbackPanel.removeClass('success')
}