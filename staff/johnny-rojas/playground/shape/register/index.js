var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Register')

var loginForm = new LoginForm
var loginLink = new Link
loginLink.setText('Login')

view.add(title)
view.add(loginForm)
view.add(loginLink)