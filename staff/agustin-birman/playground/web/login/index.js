const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Login')

const loginForm = new LoginForm
loginForm.onSubmit(event => {
    event.preventDefault()

    const usernameLogin = loginForm.getUsernameValue()
    const passwordLogin = loginForm.getPasswordValue()

    try {
        logic.loginUser(usernameLogin, passwordLogin)
    } catch (error) {
        const loginFormHeight = document.querySelector('.LoginForm')
        loginFormHeight.style.height = '350px'
        loginForm.setFeedback(error.message)
    }
})

const registerLink = new Link
registerLink.setText('Register')

registerLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../register', 500)
})

view.add(title)
view.add(loginForm)
view.add(registerLink)

