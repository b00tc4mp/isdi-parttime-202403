import fs from 'fs'
import { SystemError } from 'com/errors.js'

const findOnePost = (condition, callback) => {
    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = '[]'

        const posts = JSON.parse(json)

        const foundPost = posts.find(condition)

        callback(null, foundPost)
    })
}

export default findOnePost