// if (userLogic.isUserLoggedIn())
//     location.href = '../login'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Register')

const registerForm = new RegisterForm
registerForm.onRegister(() => setTimeout(() => location.href = '../login', 1000))

const loginLink = new Link
loginLink.setText('Login')
loginLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)
