
function LoginForm() {
    Form.call(this)

    //var form = new Form()
    this.addClass("LoginForm") // de esta manera hereda los estilos de Form y se agrega otra personaliada de "loginForm"

    var usernameField = new Field("username", "text", "Username")
    var passwordField = new Field("password", "password", "Password")


    var submitButton = new SubmitButton("Login")

    var feedbackPanel = new Component("p")
    feedbackPanel.addClass("Feedback")

    this.add(usernameField)
    this.add(passwordField)
    this.add(submitButton)
    this.add(feedbackPanel)

}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = Form


LoginForm.prototype.getUsername = function () {
    var usernameField = this.children[0]

    return usernameField.getValue()
}

LoginForm.prototype.getPassword = function () {
    var passwordField = this.children[1]

    return passwordField.getValue()
}

LoginForm.prototype.setFeedback = function (message, level) {
    var feedbackPanel = this.children[this.children.length - 1]

    if (level===("succes"))
        feedbackPanel.addClass("succes")
    feedbackPanel.setText(message)
}

RegisterForm.prototype.clear = function () {// method overriding
    Form.prototype.clear.call(this)

    var feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText("")
    feedbackPanel.removeClass("succes")

}

LoginFormForm.prototype.clear = function () {// method overriding
    Form.prototype.clear.call(this)

    var feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText("")
    feedbackPanel.removeClass("succes")

}