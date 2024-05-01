class RegisterForm extends Form {
    constructor() {
        super()

        this.addClass('RegisterForm')

        const nameField = new Field('name', 'text', 'Name')
        nameField.setPlaceholder('Nombre')

        const surnameField = new Field('surname', 'text', 'Surname')
        surnameField.setPlaceholder('Apellidos')

        const emailField = new Field('email', 'email', 'E-mail')
        emailField.setPlaceholder('name@example.com')

        const usernameField = new Field('username', 'text', 'Username')
        usernameField.setPlaceholder('Nombre de Usuario')

        const passwordField = new Field('password', 'password', 'Password')
        passwordField.setPlaceholder('Contraseña')

        const passwordRepeatField = new Field('repassword', 'password', 'Password repeat')
        passwordRepeatField.setPlaceholder('Repita contraseña')

        const submitButton = new SubmitButton('Guardar datos de usuario')

        const feedbackPanel = new Component('p')
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

    getName() {
        const nameField = this.children[0]

        return nameField.getValue()
    }

    getSurname() {
        const surnameField = this.children[1]

        return surnameField.getValue()
    }

    getEmail() {
        const emailField = this.children[2]

        return emailField.getValue()
    }

    getUsername() {
        const usernameField = this.children[3]

        return usernameField.getValue()
    }

    getPassword() {
        const passwordField = this.children[4]

        return passwordField.getValue()
    }

    getPasswordRepeat() {
        const passwordFieldRepeat = this.children[5]

        return passwordFieldRepeat.getValue()
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
        feedbackPanel.removeClass('success')
    }
}