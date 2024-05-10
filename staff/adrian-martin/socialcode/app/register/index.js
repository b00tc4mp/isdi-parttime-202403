if(logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Register')
title.onClick(() =>  alert('Remember, there will always be a better half for you.'))

const registerForm = new RegisterForm
registerForm.onRegistered(() =>  setTimeout( () =>  location.href = '../login', 1000))

const loginLink = new Link
loginLink.setText('Login')
loginLink.onClick( event => {
    event.preventDefault()

    setTimeout( () =>  location.href = '../login', 1000)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)