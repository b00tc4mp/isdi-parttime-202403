const data = {}

data.findUser = (callback) => {
    let userJson = localStorage.users

    if (!userJson) userJson = '[]'

    const users = JSON.parse(userJson)

    const user = users.find(callback)

    return user
}


data.insertUser = (user) => {
    let userJson = localStorage.users //-->Extraer info --> const userJson = localStorage.getItem('users)

    if (!userJson) { userJson = '[]' }

    const users = JSON.parse(userJson)

    users.push(user)

    userJson = JSON.stringify(users)

    localStorage.users = userJson

}