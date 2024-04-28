var logic = {}
var NAME_REGEX = /^[a-zA-z]/
var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/

logic.registerUser = function(name, username,email, password, passwordRepeat){
    if(!NAME_REGEX.test(name)){
        throw new ContentError('name is not valid')
    }

    if(!EMAIL_REGEX.test(email)){
        throw new ContentError('email is not valid')
    }

    if(!USERNAME_REGEX.test(username)){
        throw new ContentError('username is not valid')
    }

    if(!PASSWORD_REGEX.test(password)){
        throw new ContentError('Password is not valid')
    }
    if (password !== passwordRepeat){
        throw new MatchError('passwords dont\'t match')
    }

    var user = data.findUser(function(user){
        return user.email === email || user.username === username
    })
    
    if (user){
        throw new DuplicityError('user already exists')
    }

    user = {
        name: name,
        email: email,
        username: username,
        password: password
    }

    data.insertUser(user)
}