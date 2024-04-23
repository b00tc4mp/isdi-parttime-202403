var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Login')

var loginForm = new LoginForm
loginForm.onSubmit(function (event) {
    event.preventDefault()

    var userName = loginForm.getUsername()
    console.log(userName)

    var userPassword = loginForm.getPassword()
    console.log(userPassword)
})
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
view.add(loginForm)
view.add(registerLink)