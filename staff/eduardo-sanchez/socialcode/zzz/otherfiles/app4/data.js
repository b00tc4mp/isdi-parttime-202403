const data = {}

data.findUser = callback => {
    let usersJson = localStorage.users
    //const usersJson = localStorage.users
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

data.findPosts = callback => {
    let postsJson = localStorage.posts
    //const postsJson = localStorage.posts

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