import fs from 'fs'
import errors from "com/errors.js"

const { SystemError } = errors

const findPosts = (condition, callback) => {

  fs.readFile("./data/posts.json", "utf8", (error, postsJson) => {
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

export default findPosts