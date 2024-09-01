function LoginForm() {
    Form.call(this)


    this.addClass('LoginForm')

    var heading = new Heading('1')
    heading.setText('LOGIN')
    heading.addClass('Heading')

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
    passwordInput.setType('text')
    passwordInput.addClass('Input')
    passwordInput.setPlaceholder('password')

    var submitButton = new SubmitButton('LOGIN')
    submitButton.addClass('SubmitButton')


    var paragraph = new Paragraph
    paragraph.addClass('Paragraph')
    paragraph.setText('Don\'t have an account?')

    var link = new Link
    link.addClass('Link')
    link.setText('Create One')
    link.setHref('../register/index.html')

    var block = new Block
    block.addClass('Block')
    block.add(paragraph)
    block.add(link)

    var feedbackPanel = new Component('p')
    feedbackPanel.addClass('FeedbackPanel')
    this.feedbackPanel = feedbackPanel

    this.add(heading)
    this.add(usernameLabel)
    this.add(usernameInput)
    this.add(passwordLabel)
    this.add(passwordInput)
    this.add(submitButton)
    this.add(block)
    this.add(feedbackPanel)
}


LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = LoginForm

LoginForm.prototype.getUsername = function () {
    return username.value
}
LoginForm.prototype.getPassword = function () {
    return password.value
}

LoginForm.prototype.setFeedback = function (message, level) {
    if (level === 'succes')
        this.feedbackPanel.addClass('succes')

    this.feedbackPanel.setText(message)
}

LoginForm.prototype.clear = function () {
    Form.prototype.clear.call(this)

    this.feedbackPanel.setText('')
    this.feedbackPanel.removeClass('succes')
}


