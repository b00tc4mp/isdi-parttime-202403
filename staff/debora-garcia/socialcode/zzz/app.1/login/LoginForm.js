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

        // el componente recién creado se asigna como una propiedad del objeto actual (this)
        // para que sea accesible desde otros métodos de esta clase
        this.feedbackPanel = feedbackPanel



        this.add(usernameField)
        this.add(passwordField)
        this.add(submitButton)
        //this.add(feedbackPanel)

    }

    getUsername() {
        const usernameField = this.children[0]

        return usernameField.getValue()
    }

    getPassword() {
        const passwordField = this.children[1]

        return passwordField.getValue()
    }
    //TODO corregir la palabra success en js RegisterForm y en css
    setFeedback(message, level) {
        //const feedbackPanel = this.children[this.children.length - 1]

        if (level === ("success"))
            this.feedbackPanel.addClass("success")

        this.feedbackPanel.setText(message)
        //se agrega feedbackPanel al contenedor del objeto actual
        this.add(this.feedbackPanel)
    }

    clear() {
        super.clear()

        //const feedbackPanel = this.children[this.children.length - 1]

        this.feedbackPanel.setText("")
        //quitamos la classe del feedback para que de nuevo este con el color determinada 
        this.feedbackPanel.removeClass("success")

        this.remove(this.feedbackPanel)
    }
}
