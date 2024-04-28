function RegisterForm (){
    Form.call(this)

    this.addClass('RegisterFrom')

    var nameField = new Field('name', 'text', 'Name')
    nameField.setPlaceholder('Name')
    
    var emailField = new Field('email', 'text', 'Email')
    emailField.setPlaceholder('Email')

    var usernameField = new Field ('username', 'text', 'Username')
    usernameField.setPlaceholder('Usernname')

    var passwordField = new PasswordField('password', 'Password')
    passwordField.setPlaceholder('password')

    var confirmPasswordField = new PasswordField('repeat password', 'Repeat Password')
    confirmPasswordField.setPlaceholder('Repeat password')

    var registerButton = new SubmitButton('Register')

    var feedbackPanel = new Component('p')
    feedbackPanel.addClass('feedback')
    
    this.add(nameField)
    this.add(emailField)
    this.add(usernameField)
    this.add(passwordField)
    this.add(confirmPasswordField)
    this.add(registerButton)
    this.add(feedbackPanel)

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

RegisterForm.prototype.setFeedback = function(message, level){
    var feedbackPanel = this.children[this.children.length -1]

    if (level === 'success'){
        feedbackPanel.addClass('success')   
    }
    feedbackPanel.setText(message)
}

RegisterForm.prototype.clear = function(){
    Form.prototype.clear.call(this)

    var feedbackPanel= this.children[this.children.length-1]
    feedbackPanel.setText(' ')
    feedbackPanel.removeClass('success')
}


//TODO mirar classes dia 23 i 24 para comprender logic.js

//TODO aprender debug en navegador

//TODO buscar svelte reackt-JSX  Angular typescript coffeescript


//raycast
