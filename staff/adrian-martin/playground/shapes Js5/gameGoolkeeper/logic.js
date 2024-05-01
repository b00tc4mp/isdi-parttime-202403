var logic = {}

var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/

// MANEJAR DATOS/input validation
logic.registerUser = function(email, username, password, passwordRepeat){


    // validar el email
    if(!EMAIL_REGEX.test(email))
        throw new ContentError('email is not valid')

        
    // validar el usuario
    if(!USERNAME_REGEX.test(username))
        throw new ContentError('username is not valid')
            
        
    // validar la constraseña
    if(!PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid')


    // revisar si la contraseña coincide con la passwordRepeat
    if(password !== passwordRepeat)
        throw new MatchError('password don\'t match')


    var user = data.findUser(function (user) {
        return user.email === email || user.username === username
    })
        
    // Revisar si ya existe y NO existe
    if (user)
        throw new DuplicityError('user already exists')
        

    // inyectar el usuario
    user ={
        email: email,
        username: username,
        password: password,
    }

    data.insertUser(user)      
}

// var EMAIL_REGEX = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/

// var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/

// var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/

logic.loginUser = function (username, password) {
    if(!USERNAME_REGEX.test(username))
    throw new ContentError('username is not valid')

    if(!PASSWORD_REGEX.test(password))
    throw new ContentError('password is not valid')

    var user = data.findUser(function (user) {
        return user.username === username
    })

    if(!user)
        throw new MatchError('user nor found')

    if(user.password !== password)
        throw new MatchError('wrong password')
}
