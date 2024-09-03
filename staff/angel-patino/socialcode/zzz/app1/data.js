const data = {}

data.findUser = callback => {
    let usersJson = localStorage.users

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
    let postsJson = localStorage.posts

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

data.deletePost = callback => {
    let postsJson = localStorage.posts

    if (!postsJson) postsJson = '[]'

    const posts = JSON.parse(postsJson)

    const index = posts.findIndex(callback)

    if (index > -1) {
        posts.splice(index, 1)

        postsJson = JSON.stringify(posts)

        localStorage.posts = postsJson
    }
}