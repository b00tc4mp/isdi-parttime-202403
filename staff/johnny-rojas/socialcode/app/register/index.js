if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Register')
title.onClick(() => alert('By clicking on this title you wont get anything .P'))

const registerForm = new RegisterForm
registerForm.onRegistered(() => setTimeout(() => location.href = '../login', 1000))

const loginLink = new Link
loginLink.setText('Login')
loginLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)