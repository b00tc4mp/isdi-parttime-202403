import { User } from "../data/index.js"
import { Post } from "../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"

//enviamos el usuario que es lo que identifica de forma unica al usuario, luego usaremos id
//la api no sabe que usuario esta conectado (stateless), y para crear un post tiene que saber a que usuario hay que asociar el post
const createPost = (userId, title, image, description) => {
    validate.id(userId, "userId")
    validate.text(title, "title", 50)
    validate.url(image, "image")
    validate.text(description, "description", 500)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError("user not found")

            const post = {
                author: userId,
                title,
                image,
                description,
                date: new Date(),
                likes: []
            }
            return Post.create(post)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}


export default createPost