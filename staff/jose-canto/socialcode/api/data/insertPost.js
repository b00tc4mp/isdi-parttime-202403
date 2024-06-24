import fs from 'fs'
import errors from "com/errors.js"

const { SystemError } = errors

const insertPost = (post, callback) => {

  fs.readFile("./data/posts.json", "utf8", (error, postsJson) => {
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

    fs.writeFile("./data/posts.json", newJson, (error) => {

      if (error) {
        callback(new SystemError(error.message))

        return
      }

      callback(null)
    })
  })
}

export default insertPost