import fs from "fs"
import { SystemError } from "../errors.js"
const data = {}

//el callback era para buscar el usuario (condition), la respuesta hay que darla en otro callback (asyncro), de todo el proceso la lectura de la busqueda de archivo en la base de datos
// se separa la condicion de busqueda de lo que es la respuesta que da todo el proceso de busqueda del usuario
//cuando se trabaja asyncro hay que usar callbacks y no se pueden usar returns
data.findUser = (condition, callback) => {
    //importamos fs que es donde se encuentran los datos y no en el localStorage
    fs.readFile("./data/users.json", "utf8", (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = "[]"

        const users = JSON.parse(json)

        const user = users.find(condition)

        callback(null, user)
    })

    // tenemos un json (contenido en la ruta del fichero) si ha habido bien la lectura con el fs, (null, json)
    // no hay error, y entramos en el if
    // si ha encontrado usuario registrado lo enviamos al callback
    // no retornamos nada, aplicamos callback 
    // si ha ido mal enviamos error, si ha ido bien enviamos el usuario con el callback (null,usuario)
    // este callback lo recibira la logica
}

data.insertUser = (user, callback) => {
    fs.readFile("./data/users.json", "utf8", (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = "[]"

        const users = JSON.parse(json)
        users.push(user)

        const newJson = JSON.stringify(users)

        fs.writeFile("./data/users.json", newJson, error => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }
            //al devolver null significa que no hay ningun error
            callback(null)
        })
    })
}

data.findPosts = (condition, callback) => {

    /* let postsJson = localStorage.posts

    if (!postsJson) postsJson = "[]"

    const posts = JSON.parse(postsJson)

    const filtered = posts.filter(callback)

    return filtered */

    fs.readFile("./data/posts.json", "utf8", (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = "[]"

        const posts = JSON.parse(json)

        const filtered = posts.filter(condition)

        callback(null, filtered)
    })
}
//busqueda d un solo post
data.findPost = (condition, callback) => {
    fs.readFile("./data/posts.json", "utf8", (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = "[]"

        const posts = JSON.parse(json)

        const post = posts.find(condition)

        callback(null, post)
    })
}
data.insertPost = (post, callback) => {
    /* let postsJson = localStorage.posts

    if (!postsJson) postsJson = "[]"

    const posts = JSON.parse(postsJson)

    post.id = `${Math.random().toString().slice(2)}-${Date.now()}`

    posts.push(post)

    postsJson = JSON.stringify(posts) 

    localStorage.posts = postsJson*/

    fs.readFile("./data/posts.json", "utf8", (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = "[]"

        const posts = JSON.parse(json)
        post.id = `${Math.random().toString().slice(2)}-${Date.now()}`

        posts.push(post)

        const newJson = JSON.stringify(posts)

        fs.writeFile("./data/posts.json", newJson, error => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }
            //al devolver null significa que no hay ningun error
            callback(null)
        })
    })
}

data.deletePost = (condition, callback) => {
    fs.readFile("./data/posts.json", "utf8", (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = "[]"

        const posts = JSON.parse(json)

        const index = posts.findIndex(condition)

        //si index es o + es que ha encontrado el documento en el array y reescribirlo 
        if (index > -1) {
            posts.splice(index, 1)

            const newJson = JSON.stringify(posts)

            fs.writeFile("./data/posts.json", newJson, error => {
                if (error) {
                    callback(new SystemError(error.message))

                    return
                }
                //si encuentra no devuelve error
                callback(null)
            })

            //si no encuentra tampoco devuelve error
            // esta funcion solo tiene el parametro error como callback, por lo tanto solo devolvera error o null
        } else callback(null)
    })
}

export default data

// si solo hay que exportar una solo objeto se usa el default