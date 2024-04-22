var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Login')
title.onClick(function () {
    alert('Al hacer clic en este título no obtendrás nada')
})

var loginForm = new LoginForm
var registerLink = new Link
registerLink.setText('Register')
//Forma de hacerlo sin complicarse la vida //registerLink.setUrl('../register')
registerLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../register'
    }, 500)
})

view.add(title)
view.add(loginForm)
view.add(registerLink)