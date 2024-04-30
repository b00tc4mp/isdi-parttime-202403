
var logic = {}

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var USERNAME_REGEX = /^[a-zA-Z0-9]+$/

var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/

var NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/


logic.registerUser = function (email, username, password, passwordRepeat) {
    //Input validation
    /* if (!NAME_REGEX.test(name))
         throw new Error('name is not valid')
 
     if (!SURNAME_REGEX.test(surname))
         throw new Error('surname is not valid')*/

    if (!EMAIL_REGEX.test(email))
        throw new Error('email is not valid')

    if (!USERNAME_REGEX.test(username))
        throw new Error('usename is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new Error('password is not valid')

    if (!PASSWORD_REGEX.test(passwordRepeat))
        throw new Error('password don\'t match')

    var user = data.find(function (user) {
        return user.email === email || user.userame === username
    })



    if (user)
        throw new DuplicityError('username already exists')






    user = {
        email: email,
        username: username,
        password: password,
    }

    data.insertUser(user)

}

logic.loginUser = function (username, password) {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')

    var user = data.findUser(function (user) {
        return user.username === username
    })

    if (!user)
        throw new MatchError('user not found')

    if (user.password !== password)
        throw new MatchError('wrong password')

    sessionStorage.username = username

    //TODO abything else?
}

logic.isUserLoggedIn = function () {
    return !!sessionStorage.username
}

logic.logoutUser = function () {
    delete sessionStorage.username
}

logic.getUserName = function () {
    var user = data.findUser(function (user) {
        return user.username === sessionStorage.username
    })
}