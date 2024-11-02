var view = new Component(document.body)

view.addClass('View')

var title = new Heading(1)
title.setText('Login')
title.onClick(function () {
    alert("By clicking on this title you wont get anything")

})

var loginForm = new LoginForm()
var registerLink = new LinK()
registerLink.setText('Register')
//registerLink.setUrl('../register')

registerLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {

        location.href = '../register'
    }, 500)

})

//registerLink.setUrl('https://www.google.com/')
// registerLink.setTarget('_blank')

view.add(title)
view.add(loginForm)
view.add(registerLink)



