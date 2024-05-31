const data = {}

data.findUser = (callback) => {
    let usersJson = localStorage.users

    if (!usersJson) usersJson = "[]"

    const users = JSON.parse(usersJson)

    const userRegistered = users.find(callback)

    return userRegistered

}
data.insertUser = (user) => {

    let usersJson = localStorage.users

    if (!usersJson) usersJson = "[]"

    const users = JSON.parse(usersJson)

    users.push(user)

    usersJson = JSON.stringify(users)

    localStorage.users = usersJson

    //registerForm.clear()


}