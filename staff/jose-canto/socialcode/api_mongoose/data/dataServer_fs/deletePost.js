import fs from 'fs'
import errors from "com/errors.js"

const { SystemError } = errors

const deletePost = (condition, callback) => {

  fs.readFile("./data/posts.json", "utf8", (error, postsJson) => {
    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!postsJson) postsJson = "[]"

    const posts = JSON.parse(postsJson)

    const index = posts.findIndex(condition)

    if (index > -1) { //-1 significa que no hay coincidencias
      const deletedPost = posts.splice(index, 1)[0]
      const newJson = JSON.stringify(posts)


      fs.writeFile("./data/posts.json", newJson, (error) => {

        if (error) {
          callback(new SystemError(error.message))

          return
        }
        callback(null, deletedPost)


      })

    } else {
      callback(null) // no hay coincidencias
    }
  })
}

export default deletePost