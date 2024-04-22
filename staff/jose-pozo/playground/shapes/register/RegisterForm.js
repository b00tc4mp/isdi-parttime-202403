function RegisterForm() {
    Form.call(this)


    this.addClass('registerForm')

    var RegisterTitle = new Header(1)
    RegisterTitle.setText('REGISTER')
    RegisterTitle.addClass('registerTitle')

    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    usernameLabel.setFor('username')
    usernameLabel.addClass('label')

    var usernameInput = new Input()
    usernameInput.setId('username')
    usernameInput.addClass('input')
    usernameInput.setPlaceHolder('username')

    var emailLabel = new Label()
    emailLabel.setText('Em@il')
    emailLabel.setFor('email')
    emailLabel.addClass('label')

    var emailInput = new Input()
    emailInput.setId('email')
    emailInput.addClass('input')
    emailInput.setPlaceHolder('username@email.com')

    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    passwordLabel.addClass('label')

    var passwordInput = new Input()
    passwordInput.setId('password')
    passwordInput.setType('password')
    passwordInput.addClass('input')
    passwordInput.setPlaceHolder('********')

    var rPasswordLabel = new Label()
    rPasswordLabel.setText('Repeat Password')
    rPasswordLabel.addClass('label')

    var rPasswordInput = new Input()
    rPasswordInput.setId('rPassword')
    rPasswordInput.setType('rPassword')
    rPasswordInput.addClass('input')
    rPasswordInput.setPlaceHolder('********')

    var submitButton = new Button()
    submitButton.setText('REGISTER')
    submitButton.setType('submit')
    submitButton.addClass('registerButton')

    var boxP = new Box()
    boxP.addClass('boxP')


    var registerP = new Paragraph()
    registerP.setText('Have an account?\n')
    registerP.addClass('registerP')

    var registerLinkToLogin = new Link()
    registerLinkToLogin.setText('Login')
    registerLinkToLogin.addClass('registerLinkToLogin')
    registerLinkToLogin.setHref('../login/index.html')

    this.add(RegisterTitle)
    this.add(usernameLabel)
    this.add(usernameInput)
    this.add(emailLabel)
    this.add(emailInput)
    this.add(passwordLabel)
    this.add(passwordInput)
    this.add(rPasswordLabel)
    this.add(rPasswordInput)
    this.add(submitButton)
    this.add(boxP)
    boxP.add(registerP)
    boxP.add(registerLinkToLogin)
}


RegisterForm.prototype = Object.create(Form.prototype)
RegisterForm.prototype.constructor = RegisterForm