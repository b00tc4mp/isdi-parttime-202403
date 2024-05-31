
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

}
