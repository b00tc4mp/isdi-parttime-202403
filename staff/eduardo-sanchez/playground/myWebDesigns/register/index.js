var view = new Component(document.body)

view.addClass('View')

var title = new Heading(1)
title.setText('Register')

var loginForm = new LoginForm()

var loginLink = new LinK()

loginLink.setText('Login')

//registerLink.setUrl('https://www.google.com/')
// registerLink.setTarget('_blank')


view.add(title)
view.add(loginForm)
view.add(loginLink)



