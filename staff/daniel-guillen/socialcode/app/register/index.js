/* Se comprueba si el usuario ya está conectado. Si el usuario ha iniciado sesión, lo redirigirá a la página de 'home'.
Esta es una práctica común en las aplicaciones web para redirigir automáticamente a los usuarios.
a una página específica si ya están logueados.*/
if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('SOCIAL CODE - Register')
title.onClick(() => alert('By clicking on this title you wont get anything 😒'))

const registerForm = new RegisterForm
registerForm.onRegistered(() => setTimeout(() => location.href = '../login', 3000))

const loginLink = new Link
loginLink.setText('Login')
loginLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 1000)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)