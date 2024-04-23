var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Register')
title.onClick(function () {
    alert('By clicking on this title you wont get anything .P')
})

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/

var registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()

    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getPasswordRepeat()

    var logic = {}

    logic.registerUser = function (email, username, password, passwordRepeat) {
        // TODO input validation

        if (!EMAIL_REGEX.test(email)) {
            alert('email is not valid')

            return false
        }

        if (!USERNAME_REGEX.test(username)) {
            alert('username is not valid')

            return false
        }

        if (!PASSWORD_REGEX.test(password)) {
            alert('password is not valid')

            return false
        }

        if (!PASSWORD_REGEX.test(passwordRepeat)) {
            alert('password repeat is not valid')

            return false
        }

        if (password !== passwordRepeat) {
            alert('passwords don\'t match')

            return false
        }

        //var usersJson = localStorage.getItem('users')
        var usersJson = localStorage.users

        if (!usersJson) usersJson = '[]'

        var users = JSON.parse(usersJson)

        var user = users.find(function (user) {
            return user.email === email || user.username === username
        })

        if (user) {
            alert('user already exists')

            return false
        }

        user = {
            email: email,
            username: username,
            password: password
        }

        users.push(user)

        usersJson = JSON.stringify(users)

        localStorage.users = usersJson

        return true
    }

    if (logic.registerUser(email, username, password, passwordRepeat))
        registerForm.clear()
})

var loginLink = new Link
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