class RegisterForm extends FormWithFeedback{
    constructor (){
        super()

        this.addClass('RegisterFrom')

        const nameField = new Field('name', 'text', 'Name')
        nameField.setPlaceholder('Name')
        
        const emailField = new Field('email', 'text', 'Email')
        emailField.setPlaceholder('Email')

        const usernameField = new Field ('username', 'text', 'Username')
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
}

