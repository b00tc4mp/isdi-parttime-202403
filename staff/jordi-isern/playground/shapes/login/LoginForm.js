function LoginForm() {
    Form.call(this)

    this.addClass('LoginForm')

    var usernameField = new Field('username', 'text', 'Username')

    var passwordField = new PasswordField('password', 'Password')
    //var passwordReveal = new PasswordReveal(passwordField ,"fa-solid fa-lock")
 
    var submitButton = new SubmitButton('Login')

    this.add(usernameField)
    this.add(passwordField)
    this.add(submitButton)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = LoginForm

LoginForm.prototype.getUsername = function(){
    var usernameField = this.children[0]
    return usernameField.getValue()
}

LoginForm.prototype.getPassword = function(){
    var passwordField = this.children[1]
    return passwordField.getValue()

}
