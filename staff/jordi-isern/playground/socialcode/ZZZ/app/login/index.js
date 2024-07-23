if(logic.isUserLoggedIn()){
    location.href=' ../home'
}

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Login')

const loginForm = new LoginForm

loginForm.onloggedIn = () => setTimeoput(() => location.href = '../home', 1000)


const registerLink = new Link
registerLink.setText('Register')
registerLink.setUrl('../register')
registerLink.addClass('registerLink')


view.add(title)
view.add(loginForm)
view.add(registerLink)


