class LoginForm extends Form {
    constructor() {
        super()

        this.addClass('LoginForm')

        const usernameField = new Field('username', 'text', 'Username')
        usernameField.setPlaceholder('Username')

        const passwordField = new Field('password', 'password', 'Password')
        passwordField.setPlaceholder('********')

        const submitButton = new SubmitButton('Login')

        const feedbackPanel = new Component('p')
        feedbackPanel.addClass('Feedback')

        this.add(usernameField)
        this.add(passwordField)
        this.add(submitButton)
        this.add(feedbackPanel)
    }




    getUsernameValue() {
        const username = this.children[0]

        return username.getValue()
    }

    getPasswordValue() {
        const password = this.children[1]

        return password.getValue()
    }


    setFeedback(message) {
        const feedbackPanel = this.children[this.children.length - 1]

        feedbackPanel.setText(message)
    }

    clear() {
        super.clear()

        const feedbackPanel = this.children[this.children.length - 1]

        feedbackPanel.setText('')
    }
}