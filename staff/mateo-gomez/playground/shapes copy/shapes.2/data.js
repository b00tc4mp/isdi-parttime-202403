var data = {}

data.findUser = function (callback) {
    var userJson = localStorage.users

    if (!userJson) userJson = '[]'

    var users = JSON.parse(userJson)

    var user = users.find(callback)

    return user
}


data.insertUser = function (user) {
    var userJson = localStorage.users //-->Extraer info --> var userJson = localStorage.getItem('users)

    if (!userJson) userJson = '[]'

    var users = JSON.parse(userJson)

    users.push(user)

    userJson = JSON.stringify(users)

    localStorage.users = userJson

}