function RegisterForm() {
    Form.call(this)

    this.addClass('RegisterForm_')

    var heading = new Heading('1')
    heading.setText('REGISTER')
    heading.addClass('Heading')

    var emailLabel = new Label()
    emailLabel.setFor('email')
    emailLabel.setText('E-m@il')
    emailLabel.addClass('Label')

    var emailInput = new Input()
    emailInput.setId('email')
    emailInput.setType('email')
    emailInput.addClass('Input')
    emailInput.setPlaceholder('username@email.com')

    var usernameLabel = new Label()
    usernameLabel.setFor('username')
    usernameLabel.setText('Username')
    usernameLabel.addClass('Label')

    var usernameInput = new Input()
    usernameInput.setId('username')
    usernameInput.setType('text')
    usernameInput.addClass('Input')
    usernameInput.setPlaceholder('username')


    var passwordLabel = new Label()
    passwordLabel.setFor('password')
    passwordLabel.setText('Password')
    passwordLabel.addClass('Label')

    var passwordInput = new Input()
    passwordInput.setId('password')
    passwordInput.setType('password')
    passwordInput.addClass('Input')
    passwordInput.setPlaceholder('password')

    var passwordLabelRepeat = new Label()
    passwordLabelRepeat.setFor('passwordrepeat')
    passwordLabelRepeat.setText('Password repeat')
    passwordLabelRepeat.addClass('Label')

    var passwordInputRepeat = new Input()
    passwordInputRepeat.setId('passwordrepeat')
    passwordInputRepeat.setType('password')
    passwordInputRepeat.addClass('Input')
    passwordInputRepeat.setPlaceholder('password repeat')

    var submitButton = new SubmitButton('REGISTER')
    submitButton.addClass('SubmitButton')

    var paragraph = new Paragraph()
    paragraph.addClass('Paragraph')
    paragraph.setText('Have an account?')

    var link = new Link()
    link.addClass('Link')
    link.setText('Login')
    link.setHref('../login/index.html')

    var block = new Block()
    block.addClass('Block')
    block.add(paragraph)
    block.add(link)

    var feedbackPanel = new Component('p')
    feedbackPanel.addClass('FeedbackPanel')
    this.feedbackPanel = feedbackPanel

    this.add(heading)
    this.add(emailLabel)
    this.add(emailInput)
    this.add(usernameLabel)
    this.add(usernameInput)
    this.add(passwordLabel)
    this.add(passwordInput)
    this.add(passwordLabelRepeat)
    this.add(passwordInputRepeat)
    this.add(submitButton)
    this.add(block)
    this.add(feedbackPanel)
}

RegisterForm.prototype = Object.create(Form.prototype)
RegisterForm.prototype.constructor = RegisterForm

RegisterForm.prototype.getEmail = function () {
    return email.value
}
RegisterForm.prototype.getUsername = function () {
    return username.value
}
RegisterForm.prototype.getPassword = function () {
    return password.value
}
RegisterForm.prototype.getPasswordRepeat = function () {
    return passwordrepeat.value
}

RegisterForm.prototype.setFeedback = function (message, level) {
    if (level === 'succes')
        this.feedbackPanel.addClass('succes')

    this.feedbackPanel.setText(message)
}

RegisterForm.prototype.clear = function () {
    Form.prototype.clear.call(this)

    this.feedbackPanel.setText('')
    this.feedbackPanel.removeClass('succes')
}




