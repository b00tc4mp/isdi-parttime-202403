var logic = {}

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/

logic.registerUser = function (email, username, password, passwordRepeat) {

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('el correo no es valido')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('el nombre de usuario no es valido')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('el password no es valido')

    if (password !== passwordRepeat)
        throw new MatchError('el password repetido no coincide')

    var user = data.findUser(function (user) {
        return user.email === email || user.username === username
    })

    if (user)
        throw new DuplicityError('Usuario ya utilizado')

    user = {
        email: email,
        username: username,
        password: password
    }

    data.insertUser(user)
}