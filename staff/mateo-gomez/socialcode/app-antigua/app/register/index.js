//if (sessionStorage.username)
if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')


const title = new Heading(1)
title.setText('Register')

title.onClick(function () {
    alert('Haciendo click aquí no vas a poder registrarte, prueba más abajo ⬇️')
})


const registerForm = new RegisterForm
registerForm.onRegistered(() => setTimeout(() => location.href = '../login', 200))



loginLink = new Link()
loginLink.setText('Login')
//loginLink.setUrl('../login')
loginLink.onClick((event) => {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink) 