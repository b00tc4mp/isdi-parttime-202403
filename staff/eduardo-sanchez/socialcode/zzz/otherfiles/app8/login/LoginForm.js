class LoginForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass('LoginForm')

        const usernameField = new Field('username', 'text', 'Username')


        const passwordField = new Field('password', 'password', 'Password')

        const submitButton = new SubmitButton('Login')

        this.add(usernameField)
        this.add(passwordField)
        this.add(submitButton)

        this.onSubmit(event => {
            event.preventDefault()

            const username = this.getUsername()
            const password = this.getPassword()

            this.onLoginSubmittedListener(username, password)

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

    onLoginSubmitted(listener) {
        this.onLoginSubmittedListener = listener
    }
}
