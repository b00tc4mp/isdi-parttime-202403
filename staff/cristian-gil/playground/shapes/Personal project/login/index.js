var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Chasing Bubbles')
title.setSize(100)
title.onClick(function () {
    alert('Welcome!')
})

var access = new Paragraph()
access.setText('Login')
access.setSize(50)

var loginForm = new LoginForm
var registerLink = new Link
registerLink.setText('Register')
//registerLink.setUrl('../register')
registerLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../register'
    }, 500)
})

view.add(title)
view.add(access)
view.add(loginForm)
view.add(registerLink)