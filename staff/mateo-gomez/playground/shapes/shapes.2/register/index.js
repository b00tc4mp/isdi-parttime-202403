var view = new Component(document.body)
view.addClass('View')


var title = new Heading(1)
title.setText('Register')

title.onClick(function () {
    alert('Haciendo click aquí no vas a poder registrarte, prueba más abajo ⬇️')
})


var registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()

    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getPasswordRepeat()


    try {
        logic.registerUser(email, username, password, passwordRepeat)

        registerForm.clear()
    } catch (error) {


        registerForm.setFeedback(error.message)

    }
})





loginLink = new Link()
loginLink.setText('Login')
//loginLink.setUrl('../login')
loginLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../login'
    }, 500)
})

view.add(title)
view.add(registerForm)
view.add(loginLink) 