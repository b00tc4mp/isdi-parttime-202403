import { User, Post } from "../data/index.js"
import validate from "com/validate.js"
import { NotFoundError, SystemError } from "com/errors.js"

function toggleLikePost(userId, postId) {
    validate.id(userId, "userId")
    validate.id(postId, "postId")

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post)
                        throw new NotFoundError("post not found")

                    // const index = post.likes.indexOf(userId) //** 

                    // if (index < 0)
                    //     post.likes.push(userId)
                    // else
                    //     post.likes.splice(index, 1)
                    //mongoose salva un post nuevo despues de manipularlo y cambia la version.
                    //Usamos some por que es un object Id y includes usa solo primitivos
                    //el some mira dentro de los elementos de un array (objectIds) si uno de esos objetos corresponde con la condicion que le pasamos en el callback dentro del array de likes.
                    const included = post.likes.some((userObjectId) => userObjectId.toString() === userId)

                    return Post.updateOne({ _id: post._id }, included ?
                        { $pull: { likes: user._id } }
                        :
                        { $push: { likes: user._id } }
                    )
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

//** Buscamos si el usuario le ha dado like, si no lo encuentra se añade en el array likes, sino lo elimina en la posicion index

export default toggleLikePost