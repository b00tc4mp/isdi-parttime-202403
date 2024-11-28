if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Iniciar sesión')

const loginForm = new LoginForm
loginForm.onSubmit(event => {
    event.preventDefault()

    const username = loginForm.getUsername()
    const password = loginForm.getPassword()

    try {
        logic.loginUser(username, password)

        loginForm.clear()

        loginForm.setFeedback('user successfully logged in', 'success')

        setTimeout(() => location.href = '../home', 1000)
    } catch (error) {
        if (error instanceof ContentError)
            loginForm.setFeedback(error.message + ', por favor corrígelo')
        else if (error instanceof MatchError)
            loginForm.setFeedback('Credenciales incorrectas')
        else
            loginForm.setFeedback('Lo siento, hubo un error, inténtalo de nuevo más tarde.')
    }
})

const registerLink = new Link
registerLink.setText('Registrarse')
registerLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../register', 500)
})
//registerLink.setUrl('../register')
//registerLink.setTarget('_blank')

view.add(title)
view.add(loginForm)
view.add(registerLink)