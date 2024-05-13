var view = new Component(document.body)
view.addClass('View')

var titleGame = new Heading(1)
titleGame.setText('Encuentra el Punto Blanco')

var title = new Heading(2)
title.setText('Guarde sus datos de usuario')
title.onClick(function () {
    alert('Al hacer clic en este título no encontrara el punto')
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

        registerForm.setFeedback('Usuario creado', 'success')

        setTimeout(function () {
            location.href = '../login'
        }, 3000)

    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + ', por favor, corrijalo')
        if (error instanceof MatchError)
            registerForm.setFeedback(error.message + ', por favor, vuelva a intentarlo')
        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + ', por favor, pruebe uno nuevo')
            else
            registerFormForm.setFeedback('Lo siento, hubo un error, inténtalo de nuevo más tarde')
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

view.add(titleGame)
view.add(title)
view.add(registerForm)
view.add(loginLink)