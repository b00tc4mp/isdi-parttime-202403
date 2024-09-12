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
    //var passwordRepeatField = registerForm.getPasswordRepeat()

    //console.log(email, username, password, passwordRepeatField)

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

var loginLink = new LinK()

loginLink.setText('Login')
//loginLink.setUrl('../login')
loginLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {

        location.href = '../login'
    }, 500)

})

//registerLink.setUrl('https://www.google.com/')
// registerLink.setTarget('_blank')

view.add(title)
view.add(registerForm)
view.add(loginLink)



