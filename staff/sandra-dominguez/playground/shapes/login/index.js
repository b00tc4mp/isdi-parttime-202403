var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Iniciar sesión')

var loginForm = new LoginForm
var registerLink = new Link
registerLink.setText('Registrarse')
//registerLink.setUrl('https://www.google.com')
//registerLink.setTarget('_blank')

view.add(title)
view.add(loginForm)
view.add(registerLink)