class LoginForm extends Form {
    constructor() {
        super()

        //const form = new Form()
        //this.removeClass('Form')
        this.addClass('LoginForm')

        /*
        const usernameLabel = new Label()
        usernameLabel.setText('Username')
        usernameLabel.setFor('username')
    
        const usernameInput = new Input()
        usernameInput.setId('username')
        
        const usernameField = new Field('username', 'Username')
        
        this.add(usernameField)
    
        */
        const usernameField = new Field('username', 'text', 'Username')


        /*const passwordLabel = new Label()
        passwordLabel.setText('Password')
        passwordLabel.setFor('password')
    
        const passwordInput = new Input()
        passwordLabel.setId('Password')
        passwordLabel.setType('password')
    
        */

        const passwordField = new Field('password', 'password', 'Password')

        /* const submitButton = new Button()
         submitButton.setText('Register')
         submitButton.setType('submit')
     
         */

        const submitButton = new SubmitButton('Login')

        const feedbackPanel = new Component('p')
        feedbackPanel.addClass('Feedback')


        //this.add(usernameLabel)
        //this.add(passwordLabel)
        this.add(usernameField)
        //this.add(usernameInput)
        //this.add(passwordInput)
        this.add(passwordField)
        this.add(submitButton)
        this.add(feedbackPanel)
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
        const feedbackPanel = this.children[this.children.length - 1]

        if (level === 'success')
            feedbackPanel.addClass('success')

        feedbackPanel.setText(message)
    }

    clear() {
        super.clear()

        const feedbackPanel = this.children[this.children.length - 1]

        feedbackPanel.setText('')
        feedbackPanel.removeClass('success')
    }
}