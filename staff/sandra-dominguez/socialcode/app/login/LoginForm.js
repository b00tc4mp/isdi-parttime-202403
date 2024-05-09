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

        this.onSubmit(event => {
            event.preventDefault()

            const username = this.getUsername()
            const password = this.getPassword()

            try {
                logic.loginUser(username, password)

                this.clear()

                this.setFeedback('El usuario inició sesión exitosamente', 'success')

                this.onLoggedInListener()

            } catch (error) {
                if (error instanceof ContentError)
                    this.setFeedback(error.message + ', por favor corrígelo')
                else if (error instanceof MatchError)
                    this.setFeedback('Credenciales incorrectas')
                else
                    this.setFeedback('Lo siento, hubo un error, inténtalo de nuevo más tarde.')
            }
        })
    }

    getUsername() {
        const usernameField = this.children[0]

        return usernameField.getValue()
    }

    getPassword() {
        const passwordField = this.children[1]

        return passwordField.getValue()
    }

    onLoggedIn(listener) {
        this.onLoggedInListener = listener
    }
}