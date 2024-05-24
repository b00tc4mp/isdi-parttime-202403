import fs from 'fs'

import { SystemError } from '../error.js'

const data = {}

data.findUser = (condition, callback) => {
  fs.readFile("./users.json", "utf-8", (error, usersJson) => {

    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!usersJson) { usersJson = "[]" }

    const usersArray = JSON.parse(usersJson)

    const userRegistered = usersArray.find(condition)

    callback(null, userRegistered)
  })
}

data.insertUser = (user, callback) => {

  fs.readFile("./users.json", "utf-8", (error, usersJson) => {
    if (error) {
      callback(new SystemError(error.message))

      return
    }

    const usersArray = JSON.parse(usersJson)

    usersArray.push(user)

    const newJson = JSON.stringify(usersArray)

    fs.writeFile("./users.json", newJson, error => {

      if (error) {
        callback(new SystemError(error.message))

        return
      }
      callback(null)

    })
  })
}

data.findPosts = (condition, callback) => {

  fs.readFile("./posts.json", "utf-8", (error, postsJson) => {
    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!postsJson)
      postsJson = "[]"

    const posts = JSON.parse(postsJson)

    const filtered = posts.filter(condition)

    callback(null, filtered)
  })
}

data.insertPost = (post, callback) => {

  fs.readFile("./posts.json", "utf-8", (error, postsJson) => {
    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!postsJson) {
      postsJson = "[]"
    }

    const posts = JSON.parse(postsJson)

    post.id = `${Math.random().toString().slice(2)}-${Date.now()}`

    posts.push(post)

    const newJson = JSON.stringify(posts)

    fs.writeFile("./posts.json", newJson, error => {

      if (error) {
        callback(new SystemError(error.message))

        return
      }

      callback(null)
    })
  })
}

data.deletePost = (condition, callback) => {

  fs.readFile("./posts.json", "utf-8", (error, postsJson) => {
    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!postsJson) postsJson = "[]"

    const posts = JSON.parse(postsJson)

    const index = posts.findIndex(condition)

    if (index > -1) {
      posts.splice(index, 1)

      const newJson = JSON.stringify(posts)


      fs.writeFile("./posts.json", newJson, error => {

        if (error) {
          callback(new SystemError(error.message))

          return
        }
        callback(null)
      })
    } else {
      callback(null)
    }
  })
}

export default data