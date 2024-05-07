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

data.findPosts = function (callback) {
    // let??
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

    posts.push(post)

    postsJson = JSON.stringify(posts)

    localStorage.posts = postsJson

    //registerForm.clear()

}