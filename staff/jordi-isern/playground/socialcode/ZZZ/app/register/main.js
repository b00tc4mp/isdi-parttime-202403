if(logic.isUserLoggedIn()){
    location.href=' ../home'
}

const view = new Component(document.body) 
view.addClass('View')

const title = new Heading(1)
title.setText('Register')

const registerForm = new RegisterForm

registerForm.onRegistered(() => setTimeout(() => location.href = '../login', 1000))

const loginLink = new Link
loginLink.setUrl('../login')
loginLink.setText('Login')
loginLink.addClass('loginLink')

view.add(title)
view.add(registerForm)
view.add(loginLink)


