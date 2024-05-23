const data = {}
        
data.findUser = function(callback) {

    let usersJson = localStorage.users
    // Si usersJson esta vacio devuelve array vacio
    if(!usersJson) usersJson = '[]'

    // Si hay usuario - convertir a array
    const users = JSON.parse(usersJson)

    // Revisar si ya existe y existe
    const user = users.find(callback)

    return user
}

data.insertUser = function(user) { 
    let usersJson = localStorage.users
            
    if(!usersJson) usersJson = '[]'

    const users = JSON.parse(usersJson)

    // meter en el array
    users.push(user)

    // guardar en servidor
    usersJson = JSON.stringify(users)

    // guardar en local store
    localStorage.users = usersJson
}