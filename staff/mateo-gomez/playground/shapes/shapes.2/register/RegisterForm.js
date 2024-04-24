function RegisterForm() {
    Form.call(this)

    //var form = new Form()
    //this.removeClass('Form')
    this.addClass('RegisterForm')

    /*
    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    usernameLabel.setFor('username')

    var usernameInput = new Input()
    usernameInput.setId('username')
    
    var usernameField = new Field('username', 'Username')
    
    this.add(usernameField)

    */

    var emailField = new Field('email', 'email', 'E-mail')
    emailField.setPlaceholder('name@example.com')


    var usernameField = new Field('username', 'text', 'Username')
    usernameField.setPlaceholder('username')


    /*var passwordLabel = new Label()
    passwordLabel.setText('Password')
    passwordLabel.setFor('password')

    var passwordInput = new Input()
    passwordLabel.setId('Password')
    passwordLabel.setType('password')

    */

    var passwordField = new Field('password', 'password', 'Password')
    passwordField.setPlaceholder('password')
    var repeatPasswordField = new Field('password', 'password', 'Repeat Password')
    repeatPasswordField.setPlaceholder('repeat password')

    /* var submitButton = new Button()
     submitButton.setText('Register')
     submitButton.setType('submit')
 
     */

    var submitButton = new SubmitButton('Register')

    var feedbackPanel = new Component('p')
    feedbackPanel.addClass('Feedback')


    //this.add(usernameLabel)
    //this.add(passwordLabel)
    //this.add(usernameInput)
    //this.add(passwordInput)
    this.add(emailField)
    this.add(usernameField)
    this.add(passwordField)
    this.add(repeatPasswordField)
    this.add(submitButton)
    this.add(feedbackPanel)

}

RegisterForm.prototype = Object.create(Form.prototype)
RegisterForm.prototype.constructor = RegisterForm

RegisterForm.prototype.getEmail = function () {
    var emailField = this.children[0]

    return emailField.getValue()
}

RegisterForm.prototype.getUsername = function () {
    var usernameField = this.children[1]

    return usernameField.getValue()
}

RegisterForm.prototype.getPassword = function () {
    var passwordField = this.children[2]

    return passwordField.getValue()
}

RegisterForm.prototype.getPasswordRepeat = function () {
    var passwordFieldRepeat = this.children[3]

    return passwordFieldRepeat.getValue()
}

RegisterForm.prototype.setFeedback = function (message) {
    var feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText(message)
}

RegisterForm.prototype.clear = function () { // method overriding
    Form.prototype.clear.call(this)

    var feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText('')
}