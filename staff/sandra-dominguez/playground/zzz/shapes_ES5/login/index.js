if (logic.isUserLoggedIn())
    location.href = '../home'

var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Iniciar sesión')

var loginForm = new LoginForm
loginForm.onSubmit(function (event) {
    event.preventDefault()

    var username = loginForm.getUsername()
    var password = loginForm.getPassword()

    try {
        logic.loginUser(username, password)

        loginForm.clear()

        loginForm.setFeedback('user successfully logged in', 'success')

        setTimeout(function () {
            location.href = '../home'
        }, 1000)
    } catch (error) {
        if (error instanceof ContentError)
            loginForm.setFeedback(error.message + ', por favor corrígelo')
        else if (error instanceof MatchError)
            loginForm.setFeedback('Credenciales incorrectas')
        else
            loginForm.setFeedback('Lo siento, hubo un error, inténtalo de nuevo más tarde.')
    }
})

var registerLink = new Link
registerLink.setText('Registrarse')
registerLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../register'
    }, 500)
})
//registerLink.setUrl('../register')
//registerLink.setTarget('_blank')

view.add(title)
view.add(loginForm)
view.add(registerLink)