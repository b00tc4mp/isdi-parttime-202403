var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Register')
title.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
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
    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + ', por favor, corrijalo')
        if (error instanceof MatchError)
            registerForm.setFeedback(error.message + ', por favor, vuelva a intentarlo')
        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + ', por favor, pruebe uno nuevo')
        else
            registerForm.setFeedback('Lo siento, hubo un problema, pruebe más tarde')
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