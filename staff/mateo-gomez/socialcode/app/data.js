const data = {}

data.findUser = (callback) => {
    let userJson = localStorage.users

    if (!userJson) userJson = '[]'

    const users = JSON.parse(userJson)

    const user = users.find(callback)

    return user
}


data.insertUser = (user) => {
    let usersJson = localStorage.users //-->Extraer info --> const userJson = localStorage.getItem('users)

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
    // localStorage.posts = postsJson
}

data.insertPost = (post) => {
    let postJson = localStorage.posts //-->Extraer info --> const postJson = localStorage.getItem('posts)

    if (!postJson) postJson = '[]'

    const posts = JSON.parse(postJson)

    post.id = `${Math.random().toString().slice(2)}-${Date.now()}`

    posts.push(post)

    postJson = JSON.stringify(posts)

    localStorage.posts = postJson

}
data.deletePost = (callback) => {
    let postsJson = localStorage.posts //-->Extraer info --> const postJson = localStorage.getItem('posts)

    if (!postsJson) postsJson = '[]'

    const posts = JSON.parse(postsJson)

    const index = posts.findIndex(callback)

    if (index > -1)
        posts.splice(index, 1)

    postsJson = JSON.stringify(posts)

    localStorage.posts = postsJson

}