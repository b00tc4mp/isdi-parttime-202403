function LoginForm() {
    Form.call(this)

    //var form = new Form()
    //this.removeClass('Form')
    this.addClass('LoginForm')

    /*
    var usernameLabel = new Label()
    usernameLabel.setText('Username')
    usernameLabel.setFor('username')

    var usernameInput = new Input()
    usernameInput.setId('username')
    
    var usernameField = new Field('username', 'Username')
    
    this.add(usernameField)

    */
    var usernameField = new Field('username', 'text', 'Username')


    /*var passwordLabel = new Label()
    passwordLabel.setText('Password')
    passwordLabel.setFor('password')

    var passwordInput = new Input()
    passwordLabel.setId('Password')
    passwordLabel.setType('password')

    */

    var passwordField = new Field('password', 'password', 'Password')

    /* var submitButton = new Button()
     submitButton.setText('Register')
     submitButton.setType('submit')
 
     */

    var submitButton = new SubmitButton('Login')


    //this.add(usernameLabel)
    //this.add(passwordLabel)
    this.add(usernameField)
    //this.add(usernameInput)
    //this.add(passwordInput)
    this.add(passwordField)
    this.add(submitButton)
}

LoginForm.prototype = Object.create(Form.prototype)
LoginForm.prototype.constructor = Form
