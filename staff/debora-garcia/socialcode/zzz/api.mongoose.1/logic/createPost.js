import {User} from "../data/index.js" 
import {Post} from "../data/index.js" 
import { MatchError, SystemError } from "com/errors.js"
import validate from "com/validate.js"

//enviamos el usuario que es lo que identifica de forma unica al usuario, luego usaremos id
//la api no sabe que usuario esta conectado (stateless), y para crear un post tiene que saber a que usuario hay que asociar el post
const createPost = (username, title, image, description, callback) => {
    validate.username(username)
    validate.text(title, "title", 50)
    validate.url(image, "image")
    validate.text(description, "description", 500)
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError("user not found"))

                return
            }
            const post = {
                author: username,
                title,
                image,
                description,
                date: new Date(),
                likes: []
            }
            Post.create(post).lean()
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default createPost