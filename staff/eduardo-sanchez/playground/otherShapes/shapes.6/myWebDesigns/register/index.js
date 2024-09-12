var view = new Component(document.body)

view.addClass('View')

var title = new Heading(1)
title.setText('Register')
title.onClick(function () {
    alert("By clicking on this title you wont get anything")

})

var registerForm = new RegisterForm()
registerForm.onSubmit(function (event) {
    event.preventDefault()

    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getPasswordRepeat()

    var logic = {}

    logic.registerUser = function (email, username, password, passwordRepeat) {

        //TODO input validation

        var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
        var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/

        logic.registerUser = function (email, username, password, passwordRepeat) {
            // TODO input validation

            if (!EMAIL_REGEX.test(email))
                throw new Error('email is not valid')
            //alert('mail is not valid')
            //return false

            if (!USERNAME_REGEX.test(username))
                throw new Error('username is not valid')

            if (!PASSWORD_REGEX.test(password))
                throw new Error('password is not valid')

            if (!PASSWORD_REGEX.test(passwordRepeat))
                throw new Error('password repeat is not valid')

            if (password !== passwordRepeat)
                throw new Error('passwords don\'t match')

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

        if (password !== passwordRepeat) {
            alert('paswwords don\'t match')

            return false
        }

        var user = {
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

        registerForm.clear();

})

var loginLink = new LinK()

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
