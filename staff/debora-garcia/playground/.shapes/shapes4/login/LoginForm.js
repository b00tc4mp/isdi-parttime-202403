
function LoginForm() {
    Form.call(this)

    //var form = new Form()
    this.addClass("LoginForm") // de esta manera hereda los estilos de Form y se agrega otra personaliada de "loginForm"

    var usernameField = new Field("username", "text", "Username")
    var passwordField = new Field("password", "password", "Password")


    var submitButton = new SubmitButton("Login")
   /*  submitButton.setText("Register")
    submitButton.setType("submit") */


    this.add(usernameField)
    this.add(passwordField)
    this.add(submitButton)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = Form