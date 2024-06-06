class RegisterForm extends FormWithFeedback{
    constructor (){
        super()

        this.addClass('RegisterFrom')

        const nameField = new FieldInput('name', 'text', 'Name')
        nameField.setPlaceholder('Name')
        
        const emailField = new FieldInput('email', 'text', 'Email')
        emailField.setPlaceholder('Email')

        const usernameField = new FieldInput ('username', 'text', 'Username')
        usernameField.setPlaceholder('Usernname')

        const passwordField = new PasswordField('password', 'Password')
        passwordField.setPlaceholder('password')

        const confirmPasswordField = new PasswordField('repeat password', 'Repeat Password')
        confirmPasswordField.setPlaceholder('Repeat password')

        const registerButton = new SubmitButton('Register')

        const feedbackPanel = new Component('p')
        feedbackPanel.addClass('feedback')

        this.feedbackPanel = feedbackPanel
        
        this.add(nameField)
        this.add(emailField)
        this.add(usernameField)
        this.add(passwordField)
        this.add(confirmPasswordField)
        this.add(registerButton)
        
        this.onSubmit(event => {
            event.preventDefault()

            const name = this.getName()
            const surname = this.getSurname()
            const email = this.getMail()
            const password = this.getPassword()
            const passwordRepeat = this.getConfirmPassword()
            try{
                logic.registerUser(name, surname, email, surname, password, passwordRepeat, error =>{
                    if(error){
                        this.setFeedback(error.message + 'please, correct it')

                        return
                    }
                    this.clear()

                    this.setFeedback('user successfully registered', 'success')

                    this.onRegisteredListener()
                })
            }catch(error){
                if(error instanceof ContentError){
                    this.setFeedback(error.message + ', please, correct it')
                }else if(error instanceof MatchError){
                    this.setFeedback(error.message + ', please retype them')
                }else if (error instanceof DuplicityError){
                    this.setFeedback(error.message + ', please enter new one')
                }else {
                    this.setFeedback('Sorry, there was an error , please try again later')
                }
            }
        })
    }


    getName() {
        const nameField = this.children[0]
        return nameField.getValue()
    }

    getMail(){
        const emailField = this.children[1]
        return emailField.getValue()
    }

    getUserName(){
        const usernameField = this.children[2]
        return usernameField.getValue()
    }

    getPassword(){
        const passwordField = this.children[3]
        return passwordField.getValue()
    }

    getConfirmPassword(){
        const confirmPasswordField = this.children[4]
        return confirmPasswordField.getValue()
    }

    setFeedback(message, level){

        if (level === 'success'){
            this.feedbackPanel.addClass('success')   
        }
        this.feedbackPanel.setText(message)

        this.add(this.feedbackPanel)
    }

    clear(){
        Form.prototype.clear.call(this)

        const feedbackPanel= this.children[this.children.length-1]
        feedbackPanel.setText(' ')
        feedbackPanel.removeClass('success')
    }

    onRegistered(listener) {
        this.onRegisteredListener = listener
    }
}

