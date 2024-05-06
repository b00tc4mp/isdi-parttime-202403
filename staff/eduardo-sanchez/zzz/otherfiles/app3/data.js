const data = {}

data.findUser = callback => {
    let usersJson = localStorage.users
    //you can use const instead of let bcz it's only used once

    if (!usersJson) usersJson = '[]'

    const users = JSON.parse(usersJson)

    const user = users.find(callback)

    return user

}

data.insertUser = user => {
    let usersJson = localStorage.users

    if (!usersJson) usersJson = '[]'

    const users = JSON.parse(usersJson)

    users.push(user)

    usersJson = JSON.stringify(users)

    localStorage.users = usersJson

}