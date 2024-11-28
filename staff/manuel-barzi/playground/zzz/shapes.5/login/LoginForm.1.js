function Field(id, type, text) {
    Component.call(this, 'div')

    var label = new Label
    label.setText(text)
    label.setFor(id)

    var input = new Input
    input.setId(id)
    input.setType(type)

    this.add(label)
    this.add(input)
}

Field.prototype = Object.create(Component.prototype)
Field.prototype.constructor = Field

function LoginForm() {
    Form.call(this)

    // this.removeClass('Form')
    this.addClass('LoginForm')

    // var usernameLabel = new Label
    // usernameLabel.setText('Username')
    // usernameLabel.setFor('username')

    // var usernameInput = new Input
    // usernameInput.setId('username')

    /*
    //var usernameField = new Field
    //usernameField.setText('Username')
    //usernameField.setId('username')

    var usernameField = new Field('username', 'Username')

    this.add(usernameField)
    */

    var usernameField = new Field('username', 'text', 'Username')


    // var passwordLabel = new Label
    // passwordLabel.setText('Password')
    // passwordLabel.setFor('password')

    // var passwordInput = new Input
    // passwordInput.setId('password')
    // passwordInput.setType('password')

    var passwordField = new Field('password', 'password', 'Password')

    var submitButton = new Button
    submitButton.setText('Login')
    submitButton.setType('submit')

    // this.add(usernameLabel)
    // this.add(usernameInput)
    this.add(usernameField)
    // this.add(passwordLabel)
    // this.add(passwordInput)
    this.add(passwordField)
    this.add(submitButton)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = Form