var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Login')
title.onClick(function (event) {
    alert('¡Esto no es un botón!\nIntroduce tus datos de inicio de sesión más abajo 🤪')
})


var loginForm = new LoginForm
var registerLink = new Link
registerLink.setText('Register')
//registerLink.setURL('../register')
//registerLink.setUrl('https:www.google.com')
//registerLink.setTarget('_blank')

registerLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../register'
    }, 500)
})


view.add(title)
view.add(loginForm)
view.add(registerLink)
