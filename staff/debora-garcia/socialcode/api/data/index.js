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

        callback(null,user)
    })

    // tenemos un json (contenido en la ruta del fichero) si ha habido bien la lectura con el fs, (null, json)
    // no hay error, y entramos en el if
    // si ha encontrado usuario registrado lo enviamos al callback
    // no retornamos nada, aplicamos callback 
    // si ha ido mal enviamos error, si ha ido bien enviamos el usuario con el callback (null,usuario)
    // este callback lo recibira la logica


}

data.insertUser = (user,callback) => {
    fs.readFile("./data/users.json", "utf8", (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }
        const users = JSON.parse(json)
        users.push(user)

        const newJson = JSON.stringify(users)

        fs.writeFile("./data/users.json", newJson, error => {
            if (error) {
                callback(new SystemError(error.message))
    
                return
            }

            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error })

                return
            }
            //al devolver null significa que no hay ningun error
            callback(null)
        })

    })

}

data.findPosts = function (callback) {

    let postsJson = localStorage.posts

    if (!postsJson) postsJson = "[]"

    const posts = JSON.parse(postsJson)

    const filtered = posts.filter(callback)

    return filtered

}

data.insertPost = post => {

    let postsJson = localStorage.posts

    if (!postsJson) postsJson = "[]"

    const posts = JSON.parse(postsJson)


    //identificion unico combinando numeros random con tiempo
    post.id = `${Math.random().toString().slice(2)}-${Date.now()}`

    posts.push(post)

    postsJson = JSON.stringify(posts)

    localStorage.posts = postsJson

}

data.deletePost = callback => {
    let postsJson = localStorage.posts

    if (!postsJson) postsJson = "[]"

    const posts = JSON.parse(postsJson)

    const index = posts.findIndex(callback)

    if (index > -1) {
        posts.splice(index, 1)

        postsJson = JSON.stringify(posts)

        localStorage.posts = postsJson
    }
}

export default data

// si solo hay que exportar una solo objeto se usa el default