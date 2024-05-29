if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Login')

const loginForm = new LoginForm

loginForm.onLoggedIn(() => location.href = '../home')


const registerLink = new Link
registerLink.setText('Register')
registerLink.onClick(event => {
    event.preventDefault()
    location.href = '../register'
})

view.add(title)
view.add(loginForm)
view.add(registerLink)