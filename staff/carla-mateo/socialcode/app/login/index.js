// if (logic.isUserLoggedIn())
//     location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Login')

const loginForm = new LoginForm

loginForm.onLoggedIn(() => setTimeout(() => location.href = '../home', 1000))


const registerLink = new Link
registerLink.setText('Register')
registerLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../register', 500)
})

view.add(title)
view.add(loginForm)
view.add(registerLink)




