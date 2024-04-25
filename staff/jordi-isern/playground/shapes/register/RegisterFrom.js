function RegisterForm (){
    Form.call(this)

    this.addClass('RegisterFrom')

    var nameField = new Field('name', 'text', 'Name')
    nameField.setPlaceholder('Name')
    
    var emailField = new Field('enail', 'email', 'Email')
    emailField.setPlaceholder('Email')

    var usernameField = new Field ('username', 'text', 'Username')
    usernameField.setPlaceholder('Usernname')

    var passwordField = new Field('password', 'password', 'Password')
    passwordField.setPlaceholder('password')

    var confirmPasswordField = new Field('repeat password', 'password', 'Repeat Password')
    confirmPasswordField.setPlaceholder('Repeat password')

    var registerButton = new SubmitButton('Register')
    
    this.add(nameField)
    this.add(emailField)
    this.add(usernameField)
    this.add(passwordField)
    this.add(confirmPasswordField)
    this.add(registerButton)

}

RegisterForm.prototype = Object.create(Form.prototype)
RegisterForm.prototype.constructor = RegisterForm


RegisterForm.prototype.getName = function() {
    var nameField = this.children[0]
    return nameField.getValue()
}

RegisterForm.prototype.getMail = function(){
    var emailField = this.children[1]
    return emailField.getValue()
}

RegisterForm.prototype.getUserName = function(){
    var usernameField = this.children[2]
    return usernameField.getValue()
}

RegisterForm.prototype.getPassword = function(){
    var passwordField = this.children[3]
    return passwordField.getValue()
}

RegisterForm.prototype.getConfirmPassword = function(){
    var confirmPasswordField = this.children[4]
    return confirmPasswordField.getValue()
}
//TODO finish register from
RegisterForm.setfeedback

//TODO mirar classes dia 23 i 24 para comprender logic.js

