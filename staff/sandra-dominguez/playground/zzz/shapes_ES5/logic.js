var logic = {}

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/

var NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

logic.registerUser = function (name, surname, email, username, password, passwordRepeat) {
    if (!NAME_REGEX.test(name))
        throw new ContentError('El nombre no es válido')

    if (!NAME_REGEX.test(surname))
        throw new ContentError('El apellido no es válido')

    if (!EMAIL_REGEX.test(email))
        throw new ContentError('El email no es válido')

    if (!USERNAME_REGEX.test(username))
        throw new ContentError('El nombre de usuario no es válido')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('La contraseña no es válida')

    if (password !== passwordRepeat)
        throw new MatchError('Las contraseñas no coinciden')

    var user = data.findUser(function (user) {
        return user.email === email || user.username === username
    })

    if (user)
        throw new DuplicityError('El usuario ya existe')

    user = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password
    }

    data.insertUser(user)

}

logic.loginUser = function (username, password) {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError('El nombre no es válido')

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError('La contraseña no es válido')

    var user = data.findUser(function (user) {
        return user.username === username
    })

    if (!user)
        throw new MatchError('Usuario no encontrado')

    if (user.password !== password)
        throw new MatchError('Contraseña incorrecta')

    sessionStorage.username = username

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

    return user.name
}