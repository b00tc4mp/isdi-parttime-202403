import fs from 'fs'
import { SystemError } from 'com/errors.js'

const findPosts = (condition, callback) => {
    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = '[]'

        const posts = JSON.parse(json)

        const filtered = posts.filter(condition)

        callback(null, filtered)
    })
}

export default findPosts
