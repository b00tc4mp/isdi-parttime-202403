
class RegisterForm extends Form {
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

        const feedbackPanel = new Component("p")
        feedbackPanel.addClass("Feedback")

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
        const eusernameField = this.children[1]

        return eusernameField.getValue()
    }

    getPassword() {
        const passwordField = this.children[2]

        return passwordField.getValue()
    }

    getPasswordRepeat() {
        const passwordFieldRepeat = this.children[3]

        return passwordFieldRepeat.getValue()
    }

    setFeedback(message, level) {
        const feedbackPanel = this.children[this.children.length - 1]

        if (level === ("succes"))
            feedbackPanel.addClass("succes")
        feedbackPanel.setText(message)
    }

    clear() {
        super.call(this)

        const feedbackPanel = this.children[this.children.length - 1]

        feedbackPanel.setText("")
        feedbackPanel.removeClass("succes")

    }
}
