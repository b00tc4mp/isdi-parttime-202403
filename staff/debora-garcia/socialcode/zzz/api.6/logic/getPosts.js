import data from "../data/index.js" // importamos el objeto data
import { SystemError, MatchError } from "com/errors.js"
import validate from "com/validate.js"

const getPosts = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError("user not found"))

                return
            }

            data.posts.find({}).toArray()
                .then(posts => {
                    //saneamiento de datos. Tenemos que convertir el _id de mongo a id
                    posts.forEach(post => {
                        post.id = post._id.toString()

                        delete post._id
                    })

                    callback(null, posts)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}
//TODO paginar posts


export default getPosts