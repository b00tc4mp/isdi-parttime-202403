class LoginForm extends FormWithFeedback {
    constructor() {
        super()

        //var form = new Form()
        this.addClass("LoginForm") // de esta manera hereda los estilos de Form y se agrega otra personaliada de "loginForm"

        const usernameField = new Field("username", "text", "Username")
        const passwordField = new Field("password", "password", "Password")

        const submitButton = new SubmitButton("Login")

        this.add(usernameField)
        this.add(passwordField)
        this.add(submitButton)

        this.onSubmit(event => {
            event.preventDefault()

            const username = this.getUsername()
            const password = this.getPassword()

            try {
                logic.loginUser(username, password, error => {
                    if (error) {
                        this.setFeedback(error.message + ", please, correct it")

                        return
                    }
                    this.clear()

                    this.setFeedback("Log in succesful", "success")

                    this.onLoggedInListener()
                })



            } catch (error) {
                if (error instanceof ContentError)
                    this.setFeedback(error.message + " please, correct it")
                else if (error instanceof MatchError)
                    this.setFeedback("wrong credentials")
                else
                    this.setFeedback("sorry, there was an error, please try again")

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
