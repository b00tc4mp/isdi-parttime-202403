var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Login')

var loginForm = new LoginForm
var registerLink = new Link
registerLink.setText('Register')

view.add(title)
view.add(loginForm)
view.add(registerLink)