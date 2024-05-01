class LoginForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass('LoginForm')

        const usernameField = new Field('nombre de usuario', 'text', 'Nombre de usuario')
        usernameField.setPlaceholder('nombre de usuario')

        const passwordField = new Field('contraseña', 'password', 'Contraseña')
        passwordField.setPlaceholder('contraseña')

        const submitButton = new SubmitButton('Aceptar')

        this.add(usernameField)
        this.add(passwordField)
        this.add(submitButton)
    }

    getUsername() {
        const usernameField = this.children[0]

        return usernameField.getValue()
    }

    getPassword() {
        const passwordField = this.children[1]

        return passwordField.getValue()
    }
}