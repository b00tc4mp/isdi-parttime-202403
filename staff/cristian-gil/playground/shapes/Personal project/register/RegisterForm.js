function RegisterForm() {
    Form.call(this)

    this.addClass('RegisterForm')

    var firstName = new Field('firstName', 'text', 'FirstName')
    firstName.setPlaceholder('First name')

    var lastName = new Field('lastName', 'text', 'LastName')
    lastName.setPlaceholder('Last name')

    var emailField = new Field('email', 'email', 'E-mail')
    emailField.setPlaceholder('name@example.com')

    var usernameField = new Field('username', 'text', 'Username')
    usernameField.setPlaceholder('username')

    var passwordField = new Field('password', 'password', 'Password')
    passwordField.setPlaceholder('password')

    var passwordRepeatField = new Field('passwordrepeat', 'password', 'Password repeat')
    passwordRepeatField.setPlaceholder('repeat password')

    var submitButton = new SubmitButton('Register')

    this.add(firstName)
    this.add(lastName)
    this.add(emailField)
    this.add(usernameField)
    this.add(passwordField)
    this.add(passwordRepeatField)
    this.add(submitButton)

}

RegisterForm.prototype = Object.create(Form.prototype)
RegisterForm.prototype.constructor = RegisterForm

RegisterForm.prototype.getFirstName = function () {
    var firstNameField = this.children[0]

    return firstNameField.getValue()
}

RegisterForm.prototype.getLastName = function () {
    var lastNameField = this.children[1]

    return lastNameField.getValue()
}

RegisterForm.prototype.getEmail = function () {
    var emailField = this.children[2]

    return emailField.getValue()
}

RegisterForm.prototype.getUsername = function () {
    var usernameField = this.children[3]

    return usernameField.getValue()
}

RegisterForm.prototype.getPassword = function () {
    var passwordField = this.children[4]

    return passwordField.getValue()
}

RegisterForm.prototype.getPasswordRepeat = function () {
    var passwordFieldRepeat = this.children[5]

    return passwordFieldRepeat.getValue()
}