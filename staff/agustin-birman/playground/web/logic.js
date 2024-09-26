var logic = {}

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

logic.registerUser = function (email, username, password, passwordRepeat) {

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('Email is not valid')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('Username is not valid')

    if (PASSWORD_REGEX.test(password))
        throw new ContentError('Password is not valid')

    if (password !== passwordRepeat)
        throw new MatchError('Password do not match')

    var user = data.findUser(function (user) {
        return user.email === email || user.username === username
    })

    if (user)
        throw new DuplicityError('Email or username already on use')

    user = {
        email: email,
        username: username,
        password: password
    }

    data.insertUser(user)

}

logic.loginUser = function (usernameLogin, passwordLogin) {

    var usersJson = localStorage.users

    usersJson = JSON.parse(usersJson)

    var checkUser = usersJson.find(function (user) {
        return user.username === usernameLogin && user.password === passwordLogin
    })

    if (checkUser) {
        location.href = '../HomePage/index.html'
    } else {
        throw new Error('Username and/or password doesn\'t match with an actual account')
    }
}