const data = {}

data.findUser = callback => {
    const usersJson = localStorage.users

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

data.findPosts = callback => {
    const postsJson = localStorage.posts

    if (!postsJson) postsJson = '[]'

    const posts = JSON.parse(postsJson)

    const filtered = posts.filter(callback)

    return filtered
}