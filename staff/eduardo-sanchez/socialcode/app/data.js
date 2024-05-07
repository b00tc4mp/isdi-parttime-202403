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

    // let? Si solo necesitas usar las variables dentro del callback puedes usar const para declararlas. Si necesitas modificar las variables o reasignarles valores dentro del callback, debes usar let

    if (!postsJson) postsJson = '[]'

    const posts = JSON.parse(postsJson)

    const filtered = posts.filter(callback)

    return filtered
}

data.insertPost = post => {
    let postsJson = localStorage.posts

    if (!postsJson) postsJson = '[]'

    const posts = JSON.parse(postsJson)

    posts.push(post)

    postsJson = JSON.stringify(posts)

    localStorage.posts = postsJson

}