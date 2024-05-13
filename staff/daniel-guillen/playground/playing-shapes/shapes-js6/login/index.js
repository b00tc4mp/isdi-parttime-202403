if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const titleGame = new Heading(1)
titleGame.setText('Encuentra el Punto Blanco')

const title = new Heading(2)
title.setText('Bienvenido')

const loginForm = new LoginForm
loginForm.onSubmit(event => {
    event.preventDefault()

    const username = loginForm.getUsername()
    const password = loginForm.getPassword()

    try {
        logic.loginUser(username, password)

        loginForm.clear()

        loginForm.setFeedback('Se inicio sesion 🎉', 'success')

        setTimeout(() => location.href = '../home', 2000)
    } catch (error) {
        if (error instanceof ContentError) {
            loginForm.setFeedback(error.message + ', por favor, corrijalo ❌')
    }
        else if (error instanceof MatchError) {
            loginForm.setFeedback('❌ Datos de usuario incorrectos, corrijalo ❌')
        }
        else {
            loginForm.setFeedback('Lo siento, hubo un error, inténtalo de nuevo más tarde')
    }
    setTimeout(() => loginForm.setFeedback(""), 3000)
}})

const registerLink = new Link
registerLink.setText('Guarde sus datos de usuario')
registerLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../register', 1000)
})

view.add(titleGame)
view.add(title)
view.add(loginForm)
view.add(registerLink)