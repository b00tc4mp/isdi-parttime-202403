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

            try {
                logic.loginUser(username, password)

                this.clear()

                this.setFeedback('user successfully logged in', 'success')

                this.onLoggedInListener()
            } catch (error) {
                if (error instanceof ContentError)
                    loginForm.setFeedback(error.message + ', please, correct it')
                else if (error instanceof MatchError)
                    loginForm.setFeedback('wrong credentials')
                else
                    loginForm.setFeedback('sorry, there was an error, please try again later')
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