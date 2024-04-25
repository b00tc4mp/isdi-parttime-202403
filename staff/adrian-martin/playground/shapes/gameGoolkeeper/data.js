var data = {}
        
data.findUser = function(callback) {

    var usersJson = localStorage.users
    // Si usersJson esta vacio devuelve array vacio
    if(!usersJson) usersJson = '[]'

    // Si hay usuario - convertir a array
    var users = JSON.parse(usersJson)

    // Revisar si ya existe y existe
    var user = users.find(callback)

        return user
}

data.insertUser = function(user) { 
    var usersJson = localStorage.users
            
    if(!usersJson) usersJson = '[]'

    var users = JSON.parse(usersJson)

    // meter en el array
    users.push(user)

    // guardar en servidor
    usersJson = JSON.stringify(users)

    // guardar en local store
    localStorage.users = usersJson
}