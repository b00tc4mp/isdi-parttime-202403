import { User, Post } from "../data/index.js" // importamos el objeto data
import { SystemError, MatchError } from "com/errors.js"
import validate from "com/validate.js"

const getPosts = (username, callback) => {
    validate.username(username)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError("user not found"))

                return
            }

            Post.find({}).select("-__v").sort({ date: -1 }).lean()// para que devuelva los posts en orden ascendente
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