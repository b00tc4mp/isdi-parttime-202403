if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')


const mainTitle = new Heading(1)
mainTitle.setText('SocialCode')
mainTitle.addClass('MainTitle')
view.add(mainTitle)

const title = new Heading(1)
title.setText('Login')
title.onClick(event => {
    alert('¡Esto no es un botón!\nIntroduce tus datos de inicio de sesión más abajo 🤪')
})
//setTimeout(() => location.href = '../home', 200)
const loginForm = new LoginForm
loginForm.onLoggedIn(() => setTimeout(() => location.href = '../home', 200))





const registerLink = new Link
registerLink.setText('Register')
//registerLink.setURL('../register')
//registerLink.setUrl('https:www.google.com')
//registerLink.setTarget('_blank')

registerLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../register', 500)
})


view.add(title)
view.add(loginForm)
view.add(registerLink)
