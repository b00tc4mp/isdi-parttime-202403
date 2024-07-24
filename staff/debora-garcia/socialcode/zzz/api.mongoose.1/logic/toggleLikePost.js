import { User, Post } from "../data/index.js"
import validate from "com/validate.js"
import { MatchError, SystemError } from "com/errors.js"
import { ObjectId } from "mongodb"

function toggleLikePost(username, postId, callback) {
    validate.username(username)
    validate.id(postId, "postId")
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError("user not found"))

                return
            }
            Post.findOne({ _id: new ObjectId(postId) })
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
                    //mongoose salva un post nuevo despues de manipularlo y cambia la version.
                    post.save()
                        .then(() => callback(null))
                        .catch(error => callback(new SystemError(error.message)))

                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

//** Buscamos si el usuario le ha dado like, si no lo encuentra se añade en el array likes, sino lo elimina en la posicion index

export default toggleLikePost