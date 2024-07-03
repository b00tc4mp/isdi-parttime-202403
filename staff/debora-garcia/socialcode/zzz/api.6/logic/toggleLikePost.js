import data from "../data/index.js"
import validate from "com/validate.js"
import { MatchError, SystemError } from "com/errors.js"
import { ObjectId } from "mongodb"

function toggleLikePost(username, postId, callback) {
    validate.username(username)
    validate.id(postId, "postId")
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError("user not found"))

                return
            }
            data.posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) {
                        callback(new MatchError("post not found"))

                        return
                    }
                    const index = post.likes.indexOf(username) //** 

                    if (index < 0)
                        post.likes.push(username)
                    else
                        post.likes.splice(index, 1)
                    //set reemplaza el post completo

                    data.posts.updateOne({ _id: new ObjectId(postId) }, { $set: post })
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))

                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

//** Buscamos si el usuario le ha dado like, si no lo encuentra se añade en el array likes, sino lo elimina en la posicion index

export default toggleLikePost