// if (userLogic.isUserLoggedIn())
//     location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Login')
view.add(title)

const loginForm = new LoginForm
view.add(loginForm)

loginForm.onLoggedIn(() => setTimeout(() => location.href = '../home', 1000))

const registerLink = new Link
registerLink.setText('Register')
view.add(registerLink)

registerLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../register', 500)
})