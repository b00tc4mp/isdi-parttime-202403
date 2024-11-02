function Field(id, type, text) {
    Component.call(this, text)

    var label = new Label()
    label.setText(text)
    label.setFor(id)


    var input = new Input()
    input.setId(id)
    input.setType(type)

    this.add(label)
    this.add(input)
}

Field.prototype = Object.create(Component.prototype)
Field.prototype.constructor = Field



function LoginForm() {
    Form.call(this)


    this.addClass('LoginForm')

    var userNameField = new Field('username', 'text', 'Username')

    // var userNameLabel = new Label()
    // userNameLabel.setText('Username')
    // userNameLabel.setFor('username')


    // var userNameInput = new Input()
    // userNameInput.setId('username')

    /*
    //var usernameField = new Field
    //usernameField.setText('Username')
    //userNameField.setId('username')

    var userNameField = new Field('username', 'Username')
    //this.add(userNameField)

    */

    var passwordField = new Field('password', 'password', 'Password')

    // var passwordLabel = new Label()
    // passwordLabel.setText('Password')
    // passwordLabel.setFor('password')

    // var passwordInput = new Input()
    // passwordInput.setId('password')
    // passwordInput.setType('password')

    var submitButton = new Button()
    submitButton.setText('Login')
    submitButton.setType('submit')


    // this.add(userNameLabel)
    // this.add(userNameInput)
    // this.add(passwordLabel)
    // this.add(passwordInput)

    this.add(userNameField)
    this.add(passwordField)
    this.add(submitButton)


}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = Form