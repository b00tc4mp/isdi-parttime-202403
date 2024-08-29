class LoginForm extends Form {
    constructor(){
        super()

        this.addClass('LoginForm')

        var usernameField = new Field('username', 'text', 'Username')

        var passwordField = new PasswordField('password', 'Password')
        //var passwordReveal = new PasswordReveal(passwordField ,"fa-solid fa-lock")
    
        var submitButton = new SubmitButton('Login')

        var feedbackPanel = new Component('p')
        feedbackPanel.addClass('feedback')

        this.add(usernameField)
        this.add(passwordField)
        this.add(submitButton)
        this.add(feedbackPanel)
    }

    getUsername(){
        var usernameField = this.children[0]
        return usernameField.getValue()
    }

    getPassword(){
        var passwordField = this.children[1]
        return passwordField.getValue()

    }

    setFeedback(message){
        var feedbackPanel = this.children[this.children.length -1]

        feedbackPanel.setText(message)
    }
}