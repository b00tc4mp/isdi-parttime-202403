var view = new Component(document.body)
view.addClass('View')

var title = new Heading(1)
title.setText('Chasing Bubbles')
title.setSize(100)
title.onClick(function () {
    alert('Please register before playing.')
})

var access = new Paragraph()
access.setText('Register')
access.setSize(50)


var registerForm = new RegisterForm
registerForm.onSubmit(function (event) {
    event.preventDefault()

    var firstname = registerForm.getFirstName()
    var lastname = registerForm.getLastName()
    var email = registerForm.getEmail()
    var username = registerForm.getUsername()
    var password = registerForm.getPassword()
    var passwordRepeat = registerForm.getPasswordRepeat()

    var logic ={}

    logic.registerUser = function (email, username, password, passwordRepeat){
    
    var usersJson = localStorage.users

    if (!usersJson) usersJson = '[]'

    var users = JSON.parse(usersJson)

    var user = users.find(function(user){
        return user.email === email || user.username === username
    })

    if (user){
        alert('user already exists')

        return
    }

    if (password !== passwordRepeat){
        alert('password don\'t match')

        return
    }

    var user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password
    }

    users.push(user)

    usersJson = JSON.stringify(users)

    localStorage.users = usersJson
}
    logic.registerUser(email,username,password,passwordRepeat)
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
view.add(access)
view.add(registerForm)
view.add(loginLink)
