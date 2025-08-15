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
}

data.findPosts = function (callback) {

    let postsJson = localStorage.posts

    if (!postsJson) postsJson = "[]"

    const posts = JSON.parse(postsJson)

    const filtered = posts.filter(callback)

    return filtered

}

data.insertPost = post => {

    let postsJson = localStorage.posts

    if (!postsJson) postsJson = "[]"

    const posts = JSON.parse(postsJson)


    //identificion unico combinando numeros random con tiempo
    post.id = `${Math.random().toString().slice(2)}-${Date.now()}`

    posts.push(post)

    postsJson = JSON.stringify(posts)

    localStorage.posts = postsJson

}

data.deletePost = callback => {
    let postsJson = localStorage.posts

    if (!postsJson) postsJson = "[]"

    const posts = JSON.parse(postsJson)

    const index = posts.findIndex(callback)

    if (index > -1) {
        posts.splice(index, 1)

        postsJson = JSON.stringify(posts)

        localStorage.posts = postsJson
    }
}
