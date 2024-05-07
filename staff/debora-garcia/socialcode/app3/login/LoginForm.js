class LoginForm extends FormWithFeedback {
    constructor() {
        super()

        //var form = new Form()
        this.addClass("LoginForm") // de esta manera hereda los estilos de Form y se agrega otra personaliada de "loginForm"

        const usernameField = new Field("username", "text", "Username")
        const passwordField = new Field("password", "password", "Password")

        const submitButton = new SubmitButton("Login")

        this.add(usernameField)
        this.add(passwordField)
        this.add(submitButton)

    }

    getUsername() {
        const usernameField = this.children[0]

        return usernameField.getValue()
    }

    getPassword() {
        const passwordField = this.children[1]

        return passwordField.getValue()
    }
 
}
