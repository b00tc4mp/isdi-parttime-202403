var data = {}

data.findUser = function (callback) {
    var usersJson = localStorage.users

    if (!usersJson) usersJson = '[]'

    var users = JSON.parse(usersJson)

    var user = users.find(callback)

    return user

}

data.insertUser = function (user) {
    var usersJson = localStorage.users

    if (!usersJson) usersJson = '[]'

    var users = JSON.parse(usersJson)

    users.push(user)

    usersJson = JSON.stringify(users)

    localStorage.users = usersJson

}