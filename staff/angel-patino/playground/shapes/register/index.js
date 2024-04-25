var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Register')
title.onClick(function () {
    alert('By clicking on this title you wont get anything .P')
})

var registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()

    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getPasswordRepeat()

    try {
        logic.registerUser(email, username, password, passwordRepeat)

        registerForm.clear()

        registerForm.setFeedback('user successfully registered', 'success')

        setTimeout(function() {
            registerForm.clear()

            location.href = '../login'
        }, 2000)

    } catch (error) {
        if (error instanceof ContentError)
        //alert(error.message)
        registerForm.setFeedback(error.message + ', please, correct it')
        if (error instanceof MatchError)
            registerForm.setFeedback(error.message + ',please, retype them')
        else if ( error instanceof DuplicityError)
            registerForm.setFeedback(error.message + ', please, enter new one')
        else
        registerForm.setFeedback('sorry, there was an error, please try again later')

    }
})

var loginLink = new Link
loginLink.setText('Login')
//loginLink.setUrl('../login')
loginLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../login'
    }, 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)