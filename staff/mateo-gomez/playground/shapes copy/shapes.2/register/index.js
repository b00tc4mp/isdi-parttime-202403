//if (sessionStorage.username)


var view = new Component(document.body)
view.addClass('View')


var title = new Heading(1)
title.setText('Register')

title.onClick(function () {
    alert('Haciendo click aquí no vas a poder registrarte, prueba más abajo ⬇️')
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
        registerForm.setFeedback('user registered', 'success')
    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + ', please, correct it')
        else if (error instanceof MatchError)
            registerForm.setFeedback(error.message + ', please, retype them')
        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + ', please, enter new one')
        else
            registerForm.setFeedback('sorry, there was an error, please try again later')
    }
})





var loginLink = new Link
loginLink.setText('Login')
loginLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../login'
    }, 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)