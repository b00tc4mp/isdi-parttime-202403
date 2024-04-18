function Field(id, type, text) {
    Component.call(this, 'div')

    var label = new Label()
    label.setText('Username')
    label.setFor('username')

    var input = new Input()
    input.setId('username')
    input.setType(type)

    this.add(label)
    this.add(input)
}

function LoginForm() {
    Form.call(this)

    var form = new Form()
    this.removeClass('Form')
    this.addClass('LoginForm')

    /*
    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    usernameLabel.setFor('username')

    var usernameInput = new Input()
    usernameInput.setId('username')
    */

    var usernameField = new Field()


    var passwordLabel = new Label()
    passwordLabel.setText('Password')
    passwordLabel.setFor('password')

    var passwordInput = new Input()
    passwordLabel.setId('Password')
    passwordLabel.setType('password')


    var submitButton = new Button()
    submitButton.setText('Login')
    submitButton.setType('submit')


    //this.add(usernameLabel)
    //this.add(passwordLabel)
    this.add(usernameField)
    this.add(usernameInput)
    this.add(passwordInput)
    this.add(submitButton)
}

LoginForm.prototype = Object.create(Form.prototype)
