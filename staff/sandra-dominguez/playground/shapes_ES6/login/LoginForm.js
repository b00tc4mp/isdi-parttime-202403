class LoginForm extends Form {
    constructor() {
        super()

        this.addClass('LoginForm')

        const usernameField = new Field('nombre de usuario', 'text', 'Nombre de usuario')
        usernameField.setPlaceholder('nombre de usuario')

        const passwordField = new Field('contraseña', 'password', 'Contraseña')
        passwordField.setPlaceholder('contraseña')

        const submitButton = new SubmitButton('Aceptar')

        const feedbackPanel = new Component('p')
        feedbackPanel.addClass('Feedback')

        this.add(usernameField)
        this.add(passwordField)
        this.add(submitButton)
        this.add(feedbackPanel)
    }

    getUsername() {
        const usernameField = this.children[0]

        return usernameField.getValue()
    }

    getPassword() {
        const passwordField = this.children[1]

        return passwordField.getValue()
    }

    setFeedback(message, level) {
        const feedbackPanel = this.children[this.children.length - 1]

        if (level === 'success')
            feedbackPanel.addClass('success')

        feedbackPanel.setText(message)
    }

    clear() {
        super.clear()

        const feedbackPanel = this.children[this.children.length - 1]

        feedbackPanel.setText('')
        feedbackPanel
            .removeClass('success')
    }
}