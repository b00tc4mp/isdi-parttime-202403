class RegisterForm extends Form {
    constructor() {
        super()

        this.addClass('RegisterForm')

        const emailField = new Field('email', 'email', 'E-mail')
        emailField.setPlaceholder('name@example.com')

        const usernameField = new Field('username', 'text', 'Username')
        usernameField.setPlaceholder('username')

        const passwordField = new Field('password', 'password', 'Password')
        passwordField.setPlaceholder('password')

        const passwordRepeatField = new Field('password', 'password', 'Password repeat')
        passwordRepeatField.setPlaceholder('repeat password')

        const submitButton = new SubmitButton('Register')

        const feedbackPanel = new Component('p')
        feedbackPanel.addClass('Feedback')

        this.add(emailField)
        this.add(usernameField)
        this.add(passwordField)
        this.add(passwordRepeatField)
        this.add(submitButton)
        this.add(feedbackPanel)

    }



    getEmail() {
        const emailField = this.children[0]

        return emailField.getValue()
    }

    getUsername() {
        const usernameField = this.children[1]

        return usernameField.getValue()
    }

    getPassword() {
        const passwordField = this.children[2]

        return passwordField.getValue()
    }

    getPasswordRepeat() {
        const passwordFieldRepeatField = this.children[3]

        return passwordFieldRepeatField.getValue()
    }

    required() {
        this.container.required
    }

    setFeedback(message) {
        const feedbackPanel = this.children[this.children.length - 1]

        feedbackPanel.setText(message)
    }

    clear() {
        Form.prototype.clear.call(this)

        const feedbackPanel = this.children[this.children.length - 1]

        feedbackPanel.setText('')
    }
}
