const data = {}

data.findUser = callback => {
    const usersJson = localStorage.users

    if (!usersJson) usersJson = '[]'

    const users = JSON.parse(usersJson)

    const user = users.find(callback)

    return user

}

data.insertUser = user => {
    const usersJson = localStorage.users

    if (!usersJson) usersJson = '[]'

    const users = JSON.parse(usersJson)

    users.push(user)

    usersJson = JSON.stringify(users)

    localStorage.users = usersJson
}