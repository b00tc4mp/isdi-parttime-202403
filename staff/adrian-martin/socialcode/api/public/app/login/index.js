if(logic.isUserLoggedIn())
location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

const title = new Heading(1)
title.setText('Login')
title.onClick( () => {
    alert('Diablo pero tu estas bien bellaco')
})

const loginForm = new LoginForm

loginForm.onLoggedIn(() => setTimeout( () =>  location.href = '../home', 500))

const loginLink = new Link
loginLink.setText('Register')
loginLink.onClick( event => {
    event.preventDefault()

    setTimeout( () =>  location.href = '../register' , 1000)
})

view.add(title)
view.add(loginForm)
view.add(loginLink)