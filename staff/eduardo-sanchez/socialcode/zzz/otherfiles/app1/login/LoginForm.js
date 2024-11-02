class LoginForm extends Form {
    constructor() {
        super()

        this.addClass('LoginForm')

        const usernameField = new Field('username', 'text', 'Username')


        const passwordField = new Field('password', 'password', 'Password')

        const submitButton = new SubmitButton('Login')

        const feedbackPanel = new Component('p')
        feedbackPanel.addClass('Feedback')

        this.feedbackPanel = feedbackPanel


        this.add(usernameField)
        this.add(passwordField)
        this.add(submitButton)
        //this.add(feedbackPanel)
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

        //const feedbackPanel = this.children[this.children.length - 1]

        if (level === 'success')
            this.feedbackPanel.addClass('success')

        this.feedbackPanel.setText(message)

        this.add(this.feedbackPanel)

    }

    clear() {
        super.clear()

        //const feedbackPanel = this.children[this.children.length - 1]

        this.feedbackPanel.setText('')
        this.feedbackPanel.removeClass('success')

        this.remove(this.feedbackPanel)

    }

}
