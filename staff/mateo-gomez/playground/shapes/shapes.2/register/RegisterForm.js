class RegisterForm extends Form {
    constructor() {
        super()

        //const form = new Form()
        //this.removeClass('Form')
        this.addClass('RegisterForm')

        /*
        const usernameLabel = new Label()
        usernameLabel.setText('Username')
        usernameLabel.setFor('username')
    
        var usernameInput = new Input()
        usernameInput.setId('username')
        
        var usernameField = new Field('username', 'Username')
        
        this.add(usernameField)
    
        */

        const nameField = new Field('name', 'text', 'Name')
        nameField.setPlaceholder('name')

        const surnameField = new Field('surname', 'text', 'Surname')
        surnameField.setPlaceholder('surname')

        const emailField = new Field('email', 'email', 'E-mail')
        emailField.setPlaceholder('name@example.com')


        const usernameField = new Field('username', 'text', 'Username')
        usernameField.setPlaceholder('username')


        /*const passwordLabel = new Label()
        passwordLabel.setText('Password')
        passwordLabel.setFor('password')
    
        const passwordInput = new Input()
        passwordLabel.setId('Password')
        passwordLabel.setType('password')
    
        */

        const passwordField = new Field('password', 'password', 'Password')
        passwordField.setPlaceholder('password')
        const repeatPasswordField = new Field('password', 'password', 'Repeat Password')
        repeatPasswordField.setPlaceholder('repeat password')

        /* const submitButton = new Button()
         submitButton.setText('Register')
         submitButton.setType('submit')
     
         */

        const submitButton = new SubmitButton('Register')

        const feedbackPanel = new Component('p')
        feedbackPanel.addClass('Feedback')


        //this.add(usernameLabel)
        //this.add(passwordLabel)
        //this.add(usernameInput)
        //this.add(passwordInput)

        this.add(nameField)
        this.add(surnameField)
        this.add(emailField)
        this.add(usernameField)
        this.add(passwordField)
        this.add(repeatPasswordField)
        this.add(submitButton)
        this.add(feedbackPanel)

    }

    getName() {
        const nameField = this.children[0]

        return nameField.getValue()
    }

    getSurname() {
        const surnameField = this.children[1]

        return surnameField.getValue()
    }

    getEmail() {
        const emailField = this.children[2]

        return emailField.getValue()
    }

    getUsername() {
        const usernameField = this.children[3]

        return usernameField.getValue()
    }

    getPassword() {
        const passwordField = this.children[4]

        return passwordField.getValue()
    }

    getPasswordRepeat() {
        const passwordFieldRepeat = this.children[5]

        return passwordFieldRepeat.getValue()
    }

    setFeedback(message, level) {
        const feedbackPanel = this.children[this.children.length - 1]

        if (level === 'success')
            feedbackPanel.addClass('success')



        feedbackPanel.setText(message)
    }

    clear() { // method overriding
        super.clear()

        const feedbackPanel = this.children[this.children.length - 1]

        feedbackPanel.setText('')
        feedbackPanel.removeClass('success')
    }
}