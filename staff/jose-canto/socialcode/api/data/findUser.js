import fs from 'fs'
import errors from "com/errors.js"

const { SystemError } = errors

const findUser = (condition, callback) => {
  fs.readFile("./data/users.json", "utf8", (error, usersJson) => {

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

export default findUser