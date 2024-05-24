import fs from 'fs'
import { SystemError } from '../error'

const data = {}

data.findUser = (condition, callback) => {
    fs.readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = '[]'

        const users = JSON.parse(json)

        const user = users.find(condition)

        callback(null, user)
    })
}

data.insertUser = (user, callback) => {
    fs.readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        const users = JSON.parse(json)
        users.push(user)

        const newJson = JSON.stringify(users)

        fs.writeFile('./data/users.json', newJson, error => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }

            callback(null)
        })
    })

    // let usersJson = localStorage.users

    // if (!usersJson) usersJson = '[]'

    // const users = JSON.parse(usersJson)

    // users.push(user)

    // usersJson = JSON.stringify(users)

    // localStorage.users = usersJson
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

    post.id = `${Math.random().toString().slice(2)}-${Date.now()}`

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

export default data