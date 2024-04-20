var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Registrarse')

var registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()

    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    //var passwordRepeat = registerForm.getPasswordRepeat()

    var usersJson = localStorage.users

    if (!usersJson) usersJson = '[]'

    var users = JSON.parse(usersJson)

    var user = {
        email: email,
        username: username,
        password: password
    }

    users.push(user)
    usersJson = JSON.stringify(users)

    localStorage.users = usersJson

    registerForm.clear()
})

var loginLink = new Link
loginLink.setText('Iniciar sesión')
loginLink.setUrl('../login')
//loginLink.setTarget('_blank')

view.add(title)
view.add(registerForm)
view.add(loginLink)