
function RegisterForm() {
    Form.call(this)

    //var form = new Form()
    this.addClass("RegisterForm")

    //TODO verificar type email
    var emailField = new Field("email", "text", "E-mail")
    emailField.setPlaceholder("koala@example.com")

    var usernameField = new Field("username", "text", "Username")
    usernameField.setPlaceholder("RotoJaz")

    var passwordField = new Field("password", "password", "Password")
    passwordField.setPlaceholder("Password")

    var passwordRepeatField = new Field("password", "password", "Password repeat")
    passwordRepeatField.setPlaceholder("Repeat password")

    var submitButton = new SubmitButton("Register")

    var feedbackPanel = new Component("p")
    feedbackPanel.addClass("Feedback")

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
    var eusernameField = this.children[1]

    return eusernameField.getValue()
}

RegisterForm.prototype.getPassword = function () {
    var passwordField = this.children[2]

    return passwordField.getValue()
}

RegisterForm.prototype.getPasswordRepeat = function () {
    var passwordFieldRepeat = this.children[3]

    return passwordFieldRepeat.getValue()
}

RegisterForm.prototype.setFeedback = function (message, level) {
    var feedbackPanel = this.children[this.children.length - 1]
    
    if (level === ("succes"))
        feedbackPanel.addClass("succes")
    feedbackPanel.setText(message)
}

RegisterForm.prototype.clear = function () {// method overriding
    Form.prototype.clear.call(this)

    var feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText("")
    feedbackPanel.removeClass("succes")

}
