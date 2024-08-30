
class LoginForm extends Form {
    constructor() {
        super()

        //var form = new Form()
        this.addClass("LoginForm") // de esta manera hereda los estilos de Form y se agrega otra personaliada de "loginForm"

        const usernameField = new Field("username", "text", "Username")
        const passwordField = new Field("password", "password", "Password")


        const submitButton = new SubmitButton("Login")

        const feedbackPanel = new Component("p")
        feedbackPanel.addClass("Feedback")

        this.add(usernameField)
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
        //Añadiendo la classe succes pintamos de verde el mensaje
        if (level === ("succes"))
            feedbackPanel.addClass("succes")
        feedbackPanel.setText(message)
    }

    clear() {// method overriding
        Form.prototype.clear.call(this)

        const feedbackPanel = this.children[this.children.length - 1]

        feedbackPanel.setText("")
        //quitamos la classe del feedback para que de nuevo este con el color determinada 
        feedbackPanel.removeClass("succes")

    }
}
