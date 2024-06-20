import data from "../data/index.js" // importamos el objeto data
import { ContentError, MatchError } from "../errors.js"

const USERNAME_REGEX = /^[\w-]+$/

//TODO paginar posts
const getPosts = (username, callback) => {
    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")
    if (typeof callback !== "function")
        throw new TypeError("callback is not a function")
    //convertimos la funcion findPost a asincro con el callback
    //al enviar true nos devuelve todos los posts, ahor le añadimos el callback que tenemos en la capa de datos (condition,callback)->(true,(callback))->(true,(error,posts))

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }
        // los errores los mandamos al callback (no puede ser throw(syncro))
        if (!user) {
            callback(new MatchError("user not found"))

            return
        }
        data.findPosts(() => true, (error, posts) => {
            if (error) {
                //como ya sabemos que data nos devuelve el error SystemError no envolvemos este error en system error como hacemos en data;
                //si nos conectaramos a otra base de datos (ej Mongo) si que necesitariamos especificarlo.
                callback(error)

                return
            }
            callback(null, posts.reverse())
        })
    })
}

export default getPosts