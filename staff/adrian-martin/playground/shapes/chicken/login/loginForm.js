function LoginForm(){
    Form.call(this)

    // form.removeClass('form')
    this.addClass('loginForm')

    // var usernameLabel = new Label()
    // usernameLabel.setText('Username')
    // usernameLabel.setFor('username')

    // var usernameInput = new Input()
    // usernameInput.setId('username')

    var usernameFild = new Field('username','text', 'Username')

    // var passwordLabel = new Label()
    // passwordLabel.setText('Password')
    // passwordLabel.setFor('password')

    // var passwordInput = new Input()
    // passwordInput.setId('password')
    // passwordInput.setType('password')


    var passwordField = new Field('password','password', 'Password')

    // var submitButton = new Button()
    // submitButton.setText('Register')
    // submitButton.setType('submit')

    var submitButton = new SubmitButton('Login')
    // this.add(usernameLabel)
    // this.add(usernameInput)
    this.add(usernameFild)
    // this.add(passwordLabel)
    // this.add(passwordInput)
    this.add(passwordField)
    this.add(submitButton)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = Form


