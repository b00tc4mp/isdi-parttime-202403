const data = {}

data.findUser = function (callback) {
    const usersJson = localStorage.users

    if (!usersJson) usersJson = '[]'

    const users = JSON.parse(usersJson)

    const user = users.find(callback)

    return user
}

data.insertUser = function(user){
    const usersJson = localStorage.users

    if(!usersJson){
        usersJson = '[]'
    }
    const users = JSON.parse(usersJson)

    users.push(user)

    usersJson = JSON.stringify(users)

    localStorage.users = usersJson
}