import fs from 'fs'
import errors from "com/errors.js"

const { SystemError } = errors

const insertUser = (user, callback) => {

  fs.readFile("./data/users.json", "utf8", (error, usersJson) => {
    if (error) {
      callback(new SystemError(error.message))

      return
    }

    if (!usersJson) usersJson = "[]"

    const usersArray = JSON.parse(usersJson)

    usersArray.push(user)

    const newJson = JSON.stringify(usersArray)

    fs.writeFile("./data/users.json", newJson, (error) => {

      if (error) {
        callback(new SystemError(error.message))

        return
      }
      callback(null)
    })
  })
}

export default insertUser