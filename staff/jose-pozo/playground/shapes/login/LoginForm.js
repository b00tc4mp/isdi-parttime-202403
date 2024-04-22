function LoginForm() {
    Form.call(this)


    this.addClass('loginForm')

    var loginTitle = new Header(1)
    loginTitle.setText('LOGIN')
    loginTitle.addClass('loginTitle')

    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    usernameLabel.setFor('username')
    usernameLabel.addClass('label')

    var usernameInput = new Input()
    usernameInput.setId('username')
    usernameInput.addClass('input')
    usernameInput.setPlaceHolder('username')

    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    passwordLabel.addClass('label')

    var passwordInput = new Input()
    passwordInput.setId('password')
    passwordInput.setType('password')
    passwordInput.addClass('input')
    passwordInput.setPlaceHolder('password')


    var submitButton = new Button()
    submitButton.setText('LOGIN')
    submitButton.setType('submit')
    submitButton.addClass('loginButton')

    var boxP = new Box()
    boxP.addClass('boxP')

    var loginP = new Paragraph()
    loginP.setText('Don\'t have an account?')
    loginP.addClass('loginP')

    var loginLinkToRegister = new Link()
    loginLinkToRegister.setText('Create one')
    loginLinkToRegister.addClass('loginLinkToRegister')
    loginLinkToRegister.setHref('../register/index.html')

    this.add(loginTitle)
    this.add(usernameLabel)
    this.add(usernameInput)
    this.add(passwordLabel)
    this.add(passwordInput)
    this.add(submitButton)
    this.add(boxP)
    boxP.add(loginP)
    boxP.add(loginLinkToRegister)
}


LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = LoginForm