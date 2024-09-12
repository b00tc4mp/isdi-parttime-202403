function LoginForm() {
    Form.call(this)

    this.addClass('LoginForm')

    var userNameField = new Field('username', 'text', 'Username')


    var passwordField = new Field('password', 'password', 'Password')

    var submitButton = new SubmitButton('Login')

    var feedbackPanel = new Component('p')
    feedbackPanel.addClass('Feedback')


    this.add(userNameField)
    this.add(passwordField)
    this.add(submitButton)
    this.add(feedbackPanel)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = LoginForm

LoginForm.prototype.getUsername = function () {
    var userNameField = this.children[0]

    return userNameField.getValue()
}

LoginForm.prototype.getPassword = function () {
    var passwordField = this.children[1]

    return passwordField.getValue()
}

LoginForm.prototype.setFeedback = function (message, level) {
    var feedbackPanel = this.children[this.children.length - 1]

    if (level === 'success')
        feedbackPanel.addClass('success')

    feedbackPanel.setText(message)

}

LoginForm.prototype.clear = function () {
    Form.prototype.clear.call(this)

    var feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText('')
    feedbackPanel.removeClass('success')

}
