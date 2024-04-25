var logic = {}

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/

logic.registerUser = function (email, username, password, passwordRepeat) {
    
    if (!EMAIL_REGEX.test(email))
        throw new ContentError('email is not valid')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')

        //no haria falta ya que con la anterior y la siguiente ya estamos validando
    //if (!PASSWORD_REGEX.test(passwordRepeat))
     //   throw new ContentError('password repeat is not valid')

    if (password !== passwordRepeat)
        throw new MatchError('passwords don\'t match')

     var user = data.findUser(function (user) {
            return user.email === email || user.username === username
        })
    //var usersJson = localStorage.getItem('users')
    
    if (user)
        throw new DuplicityError('user already exists')

    user = {
        email: email,
        username: username,
        password: password
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

    // TODO anything else?
}