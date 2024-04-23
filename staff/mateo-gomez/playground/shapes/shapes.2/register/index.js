var view = new Component(document.body)
view.addClass('View')


var title = new Heading(1)
title.setText('Register')

title.onClick(function () {
    alert('Haciendo click aquí no vas a poder registrarte, prueba más abajo :)')
})

var registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()

    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getPasswordRepeat()

    var usersJson = localStorage.users

    if (!usersJson) usersJson = '[]'

    var users = JSON.parse(usersJson)

    var user = users.find(function (users) {
        return users.email === email || users.userame === username
    })

    if (user) {
        alert('el usuario ya existe')

        return
    }

    if (password !== passwordRepeat) {
        alert('passwords don\'t match \!')

        return
    }

    var user = {
        email: email,
        username: username,
        password: password,
    }

    users.push(user)

    usersJson = JSON.stringify(users)

    localStorage.users = usersJson

    sterForm.clear()

})


var loginLink = new Link()
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