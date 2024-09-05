var logic = {}

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/

logic.registerUser = function (email, username, password, passwordRepeat) {


    if (!EMAIL_REGEX.test(email))
        throw new Error('email is not valid')

    if (!USERNAME_REGEX.test(username))
        throw new Error('username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new Error('password is not valid')

    // if (!PASSWORD_REGEX.test(passwordRepeat))
    //     throw new Error('password repeat is not valid')

    if (password !== passwordRepeat)
        throw new Error('passwords don\'t match')

    var data = {}

    data.findUser = function (callback) {
        var usersJson = localStorage.users

        if (!usersJson) usersJson = '[]'

        var users = JSON.parse(usersJson)

        var user = users.find(callback)

        return user

        // var user = users.find(function (user) {
        //     return user.email === email || user.username === username
        // })
    }

    data.insertUser = function (user) {
        var usersJson = localStorage.users

        if (!usersJson) usersJson = '[]'

        var users = JSON.parse(usersJson)

        users.push(user)

        usersJson = JSON.stringify(users)

        localStorage.users = usersJson

    }

    var user = data.findUser(function (user) {
        return user.email === email || user.username === username
    })

    if (user)
        throw new Error('user already exists')

    user = {
        email: email,
        username: username,
        password: password
    }

    data.insertUser(user)

    // users.push(user)

    // usersJson = JSON.stringify(users)

    // localStorage.users = usersJson

}