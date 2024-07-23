class LoginForm extends FormWithFeedback {
    constructor(){
        super()

        this.addClass('LoginForm')

        const usernameField = new FieldInput('username', 'text', 'Username')

        const passwordField = new PasswordField('password', 'Password')
        //var passwordReveal = new PasswordReveal(passwordField ,"fa-solid fa-lock")
    
        const submitButton = new SubmitButton('Login')

        const feedbackPanel = new Component('p')
        feedbackPanel.addClass('feedback')

        this.feedbackPanel = feedbackPanel
        
        this.add(usernameField)
        this.add(passwordField)
        this.add(submitButton)

        this.onSubmint(event =>{
            event.preventDefault()

            const username = this.getUsername()
            const password = this.getPassword()

            try{
                logic.loginUser(username, password, error =>{
                    if(error){
                        this.setFeedback(error.message + ', please correct it')

                        return
                    }
                    this.clear()

                    this.setFeedback('user successfully logged in','seccess')

                    this.onLoggedInListener()
                })
            } catch (error){
                if(error instanceof ContentError){
                    this.setFeedback(error.message + ', please correct it')
                }else if(error instanceof MatchError){
                    this.setFeedback('wrong credentials')
                }else {
                    this.setFeedback('sorry, there was an error, please try again later')
                }
            }
        })
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

        this.feedbackPanel.setText(message)

        this.add(this.feedbackPanel)
    }
}