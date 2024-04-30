function RegisterForm() {
    Form.call(this)

    this.addClass('RegisterForm')

    var emailField = new Field('email', 'email', 'E-mail')
    emailField.setPlaceholder('example@gmail.com')

    var usernameField = new Field('username', 'text', 'Username')
    usernameField.setPlaceholder('username')

    var passwordField = new Field('password', 'password', 'Password')
    passwordField.setPlaceholder('password')

    var passwordRepeatField = new Field('password', 'password', 'Password Repeat')
    passwordRepeatField.setPlaceholder('password repeat')

    var submitButton = new SubmitButton('Register')

    var feedbackPanel = new Component('p')
    feedbackPanel.addClass('Feedback')

    this.add(emailField)
    this.add(usernameField)
    this.add(passwordField)
    this.add(passwordRepeatField)
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
    var passwordRepeatField = this.children[3]

    return passwordRepeatField.getValue()
}

RegisterForm.prototype.setFeedback = function(message, level){
    var feedbackPanel = this.children[this.children.length - 1]

    if(level === 'success')
        feedbackPanel.addClass('success')

    feedbackPanel.setText(message)
}

RegisterForm.prototype.clear = function() {
    Form.prototype.clear.call(this)

    var feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText('')
    feedbackPanel.removeClass('success')

}

