
class RegisterForm extends FormWithFeedback {
    constructor() {
        super()

        this.addClass("RegisterForm")

        //TODO verificar type email
        const emailField = new Field("email", "text", "E-mail")
        emailField.setPlaceholder("koala@example.com")

        const usernameField = new Field("username", "text", "Username")
        usernameField.setPlaceholder("RotoJaz")

        const passwordField = new Field("password", "password", "Password")
        passwordField.setPlaceholder("Password")

        const passwordRepeatField = new Field("password", "password", "Password repeat")
        passwordRepeatField.setPlaceholder("Repeat password")

        const submitButton = new SubmitButton("Register")


        this.add(emailField)
        this.add(usernameField)
        this.add(passwordField)
        this.add(passwordRepeatField)
        this.add(submitButton)

        // este metodo lo hemos trasladado como propiedad del constructor
        this.onSubmit(event => {
            event.preventDefault()

            const email = this.getEmail()
            const username = this.getUsername()
            const password = this.getPassword()
            const passwordRepeat = this.getPasswordRepeat()

            try {
                logic.registerUser(email, username, password, passwordRepeat, error => {
                    if (error) {
                        this.setFeedback(error.message + ", please, correct it")

                        return
                    }
                    this.clear()

                    this.setFeedback("Registration successful!", "success")

                    this.onRegisteredListener()
                })



            } catch (error) {
                if (error instanceof ContentError)
                    this.setFeedback(error.message + " please, correct it")
                else if (error instanceof MatchError)
                    this.setFeedback(error.message + " please, retype them")
                else if (error instanceof DuplicityError)
                    this.setFeedback(error.message + " please, enter a new one ")
                else
                    this.setFeedback("sorry, there was an error, please try later")
            }
        })
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
        const passwordFieldRepeat = this.children[3]

        return passwordFieldRepeat.getValue()
    }


    onRegistered(listener) {
        this.onRegisteredListener = listener
    }
}
