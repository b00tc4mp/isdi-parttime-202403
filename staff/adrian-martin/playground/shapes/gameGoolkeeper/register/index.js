var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Register')
title.onClick(function () {
    alert('By clicking on this title you wont get anything ^_^')
})

var registerForm = new RegisterForm()
registerForm.onSubmit(function(event) {
    event.preventDefault()

    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    // var passwordRepeat = registerForm.getRetypePassword()

    // trae users
    var usersJson = localStorage.users

    // Si usersJson esta vacio devuelve array vacio
    if(!usersJson) usersJson = '[]'

    // Si hay usuario - convertir a array
    var users = JSON.parse(usersJson)

    // inyectar el usuario
    var user ={
        email: email,
        username: username,
        password: password,
        // passwordRepeat: passwordRepeat
    }

    // meter en el array
    users.push(user)
    Shape()
    // guardar en servidor
    usersJson = JSON.stringify(users)

    // guardar en local store
    localStorage.users = usersJson

    registerForm.reset()
})

var loginLink = new Link
loginLink.setText('Login')
//loginLink.setUrl('../login')
loginLink.onClick(function (event) {
    event.preventDefault()

    setTimeout(function () {
        location.href = '../login'
    }, 2000)
})


view.add(title)
view.add(registerForm)
view.add(loginLink)



// var registerForm = new RegisterForm
// registerForm.onSubmit(function (event) {
//     event.preventDefault()

//     var email = registerForm.getEmail()
//     var username = registerForm.getUsername()
//     var password = registerForm.getPassword()
//     var passwordRepeat = registerForm.getPasswordRepeat()

//     var usersJson = localStorage.users

//     if (!usersJson) usersJson = '[]'

//     var users = JSON.parse(usersJson)

//     var user = users.find(function (user) {
//         return user.email === email || user.username === username
//     })

//     if (user) {
//         alert('user already exists')

//         return
//     }

//     if (password !== passwordRepeat) {
//         alert('passwords don\'t match')

//         return
//     }

//     user = {
//         email: email,
//         username: username,
//         password: password
//     }

//     users.push(user)

//     usersJson = JSON.stringify(users)

//     localStorage.users = usersJson

//     registerForm.clear()
// })



// view.add(player2)
// view.add(player1)



