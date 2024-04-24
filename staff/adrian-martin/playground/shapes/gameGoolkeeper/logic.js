var logic = {}

var EMAIL_REGEX = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/

var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/

var PASSWORD_REGEX = /^[a-zA-Z0-9-_]+$/

    // MANEJAR DATOS/input validation
    logic.registerUser = function(email, username, password, passwordRepeat){
        // trae users, trae el json
        var usersJson = localStorage.users

        // validar el email
        if(!EMAIL_REGEX.test(email))
            throw new Error('email is not valid')

        
        // validar el usuario
        if(!USERNAME_REGEX.test(username))
            throw new Error('username is not valid')
            
        
        // validar la constraseña
        if(!PASSWORD_REGEX.test(password))
            throw new Error('password is not valid')


        // revisar si la contraseña coincide con la passwordRepeat
        if(password !== passwordRepeat)
            throw new Error('password don\'t match')
        

        // Si usersJson esta vacio devuelve array vacio
        if(!usersJson) usersJson = '[]'

        // Si hay usuario - convertir a array
        var users = JSON.parse(usersJson)

        // Revisar si ya existe y existe
        var user = users.find(function(user) {
            return user.email === email || user.username === username
        })

        // Revisar si ya existe y NO existe
        if (user)
            throw new Error('user already exists')
        

        // inyectar el usuario
        user ={
            email: email,
            username: username,
            password: password,
        }

        // meter en el array
        users.push(user)

        // guardar en servidor
        usersJson = JSON.stringify(users)

        // guardar en local store
        localStorage.users = usersJson
    }

