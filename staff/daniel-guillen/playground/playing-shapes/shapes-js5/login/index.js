var view = new Component(document.body)
view.addClass('View')

var titleGame = new Heading(1)
titleGame.setText('Encuentra el Punto Blanco')

var title = new Heading(2)
title.setText('Login')
title.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

var loginForm = new LoginForm

loginForm.onSubmit(function (event) {
    event.preventDefault()

    var username = loginForm.getUsername()
    var password = loginForm.getPassword()

    try {
        logic.loginUser(username, password)

        loginForm.clear()

        loginForm.setFeedback('Se inicio sesion', 'success')

        setTimeout(function () {
            location.href = '../home'
        }, 3000)
    } catch (error) {
        if (error instanceof ContentError)
            loginForm.setFeedback(error.message + ', por favor, corrijalo')
        else if (error instanceof MatchError)
            loginForm.setFeedback('Por favor, corrijalo')
        else
            loginForm.setFeedback('Lo siento, hubo un error, inténtalo de nuevo más tarde')
    }
})

var registerLink = new Link
registerLink.setText('Register')
//Forma de hacerlo sin complicarse la vida //registerLink.setUrl('../register')
registerLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../register'
    }, 500)
})

view.add(titleGame)
view.add(title)
view.add(loginForm)
view.add(registerLink)