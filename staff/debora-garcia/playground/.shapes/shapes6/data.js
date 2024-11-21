
var data = {}

data.findUser = function (callback) {
    var usersJson = localStorage.users

    if (!usersJson) usersJson = "[]"

    var users = JSON.parse(usersJson)

    var userRegistered = users.find(callback)

    return userRegistered

}
data.insertUser = function (user) {

    var usersJson = localStorage.users

    if (!usersJson) usersJson = "[]"

    var users = JSON.parse(usersJson)

    users.push(user)

    usersJson = JSON.stringify(users)

    localStorage.users = usersJson

    //registerForm.clear()


}