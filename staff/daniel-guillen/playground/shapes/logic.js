var logic = {}

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/

logic.registerUser = function (email, username, password, passwordRepeat) {

    if (!EMAIL_REGEX.test(email))
        throw new Error('correo no valido, pruebe con otro')

    if (!USERNAME_REGEX.test(username))
        throw new Error('nombre de usuario no valido, pruebe con otro')

    if (!PASSWORD_REGEX.test(password))
        throw new Error('password no valido, pruebe con otro')

    if (!PASSWORD_REGEX.test(passwordRepeat))
        throw new Error('password no valido, pruebe con otro')

    if (password !== passwordRepeat)
        throw new Error('password no coincide')

    // equivalencia var usersJson = localStorage.getItem('users')
    var usersJson = localStorage.users

    if (!usersJson) usersJson = '[]'

    var users = JSON.parse(usersJson)

    var user = users.find(function (user) {
        return user.email === email || user.username === username
    })

    if (user)
        throw new Error('pruebe otro nombre de usuario')

    user = {
        email: email,
        username: username,
        password: password
    }

    users.push(user)

    usersJson = JSON.stringify(users)

    localStorage.users = usersJson
}