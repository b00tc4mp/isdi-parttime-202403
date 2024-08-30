
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
    //Añadiendo la classe succes pintamos de verde el mensaje
    if (level === ("succes"))
        feedbackPanel.addClass("succes")
    feedbackPanel.setText(message)
}

LoginForm.prototype.clear = function () {// method overriding
    Form.prototype.clear.call(this)

    var feedbackPanel = this.children[this.children.length - 1]

    feedbackPanel.setText("")
    //quitamos la classe del feedback para que de nuevo este con el color determinada 
    feedbackPanel.removeClass("succes")

}
