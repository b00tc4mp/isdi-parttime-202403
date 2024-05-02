const data = {}

data.findUser = callback => {
    const userJson = localStorage.userJson

    if (!userJson) userJson = '[]'

    const users = JSON.parse(userJson)

    const user = users.find(callback)

    return user
}

data.insertUser = user => {
    const userJson = localStorage.users

    if (!userJson) userJson = '[]'

    const users = JSON.parse(userJson)

    users.push(user)

    userJson = JSON.stringify(users)

    localStorage.users = userJson
}