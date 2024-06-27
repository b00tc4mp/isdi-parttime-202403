import fs from 'fs'
import { SystemError } from 'com/errors.js'

const deletePost = (condition, callback) => {
    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = '[]'

        const posts = JSON.parse(json)

        const index = posts.findIndex(condition)

        if (index > -1) {
            posts.splice(index, 1)

            const newJson = JSON.stringify(posts)

            fs.writeFile('./data/posts.json', newJson, error => {
                if (error) {
                    callback(new SystemError(error.message))

                    return
                }

                callback(null)
            })
        } else callback(null)
    })
}

export default deletePost