var logic = {}
//creamos un metodo para el objeto logic para almacenar los datos de los usuarios. Modelizar las reglas de negocio

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/

logic.registerUser = function (email, username, password, passwordRepeat) {

    if (!EMAIL_REGEX.test(email)) // .test funciona comprobamndo que el valor que lo pases contenga esos caracteres
        throw new ContentError("email is not valid")

    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError("password is not valid")

    if (password !== passwordRepeat)
        throw new MatchError("passwords don't match")


    var user = data.findUser(function (user) {
        return user.email === email || user.username === username
        // si el array esta vacio o no lo encuentra retornara undefined
    })


    if (user)
        throw new DuplicityError("user already exists")


    var user = {
        email: email,
        username: username,
        password: password
    }

    data.insertUser(user)

}


logic.loginUser = function (username, password) {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")

    if (!PASSWORD_REGEX.test(password))
        throw new ContentError("password is not valid")

    var user = data.findUser(function (user) {
        return user.username === username
    })

    if (!user)
        throw new MatchError("user not fount")

    if (user.password !== password)
        throw new MatchError("wrong password")

    sessionStorage.username = username
    // sessionStorage almacena datos mientras la ventana esté abierta
    // de esta manera conectas al usuario a la session
}

logic.isUserLoggedIn = function () {
    //return sessionStorage.user ? true : false

    return !!sessionStorage.username // doble negacion conviertes string a booleano
}

logic.logoutUser = function () {
    delete sessionStorage.username
}

logic.getUserName = function () {
    var user = data.findUser(function (user) {
        return user.username === sessionStorage.username
    })
    return user.username
}