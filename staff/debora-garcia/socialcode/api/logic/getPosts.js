import { User, Post } from "../data/index.js" // importamos el objeto data
import { SystemError, MatchError } from "com/errors.js"
import validate from "com/validate.js"

const getPosts = (userId) => {
    validate.id(userId, "userId")

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new MatchError("user not found")

            return Post.find({}).populate("author", "username").select("-__v").sort({ date: -1 }).lean()// para que devuelva los posts en orden ascendente
                .catch(error => { throw new SystemError(error.message) })
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
                    return (posts)
                })
        })
}
//TODO paginar posts


export default getPosts