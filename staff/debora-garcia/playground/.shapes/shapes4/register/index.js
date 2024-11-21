var view = new Component(document.body)

view.addClass("View")

var title = new Heading(1)
title.setText("New account!")

var registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()
    console.log("submit")

    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getPasswordRepeat()

    console.log(email, username, password, passwordRepeat)

    var usersJson = localStorage.users

    if (!usersJson) usersJson = "[]"

    var users = JSON.parse(usersJson)

    var user = users.find(function (user) {
        return user.email === email || user.username === username
    })
    // si el array esta vacio o no lo encuentra retornara undefined

    if (user) {
        alert("user already exists")
        return // fuerzas a que salga de la funcion
    } else if (password !== passwordRepeat) {
        alert("password doesn't match")
    } else {
        var user = {
            email: email,
            username: username,
            password: password
        }

        users.push(user)

        usersJson = JSON.stringify(users)

        localStorage.users = usersJson

        registerForm.clear()

        location.href = "../login"

    }


})

var loginLink = new Link
loginLink.setText("Login")
//loginLink.setUrl("../login") esta seria la forma rapida de que el link te redirigera a otra pagina
// pero lo haremos mediante JS:

loginLink.onClick(function (event) {
    event.preventDefault()
    console.log("controlado por JS")
    setTimeout(function () {
        location.href = "../login"
    }, 1000)
})

view.add(title)
view.add(registerForm)
view.add(loginLink)
