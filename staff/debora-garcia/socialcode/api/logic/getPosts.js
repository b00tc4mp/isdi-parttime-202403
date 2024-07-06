import { User, Post } from "../data/index.js" // importamos el objeto data
import { SystemError, MatchError } from "com/errors.js"
import validate from "com/validate.js"

const getPosts = (userId, callback) => {
    validate.id(userId, "userId")
    validate.callback(callback)

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError("user not found"))

                return
            }

            Post.find({}).populate("author", "username").select("-__v").sort({ date: -1 }).lean()// para que devuelva los posts en orden ascendente
                .then(posts => {
                    //saneamiento de datos. Tenemos que convertir el _id de mongo a id
                    posts.forEach(post => {
                        post.id = post._id.toString()
                        delete post._id

                        //mongoose reaprovecja los objetos de tal manera que usaria el mismo para cuando el mismo autor crea dos posts
                        //por lo que hacemos un if en el caso que no hayamos normlizado la propiedad id, de lo contrario no coincidirian
                        if (post.author._id) {
                            //authpr ahora es un objeto que tiene { _id, username }

                            post.author.id = post.author._id.toString() //saneamiento de datos

                            delete post.author._id
                        }
                        //eliminamos el objectid de la propiedad al imprinir los posts
                        post.likes.map(userObjectId => userObjectId.toString())
                    })
                    callback(null, posts)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}
//TODO paginar posts


export default getPosts