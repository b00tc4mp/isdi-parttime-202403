import fs from 'fs'
import errors from "com/errors.js"

const { SystemError } = errors

const findOnePost = (condition, callback) => {

  fs.readFile("./data/posts.json", "utf8", (error, postsJson) => {
    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!postsJson)
      postsJson = "[]"

    const posts = JSON.parse(postsJson)

    const postFind = posts.find(condition)

    callback(null, postFind)
  })
}

export default findOnePost