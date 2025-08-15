import data from "../data/index.js" // importamos el objeto data
import { ContentError, MatchError } from "../errors.js"

const USERNAME_REGEX = /^[\w-]+$/

//enviamos el usuario que es lo que identifica de forma unica al usuario, luego usaremos id
//la api no sabe que usuario esta conectado (stateless), y para crear un post tiene que saber a que usuario hay que asociar el post
const createPost = (username, title, image, description, callback) => {

    if (!USERNAME_REGEX.test(username))
        throw new ContentError("username is not valid")
    if (typeof title !== "string" || !title.length || title.length > 50)
        throw new ContentError("title is not valid")
    if (typeof image !== "string" || !image.startsWith("http"))
        throw new ContentError("image is not valid")
    if (typeof description !== "string" || !description.length || description.length > 5000)
        throw new ContentError("description is not valid")
    if (typeof callback !== "function")
        throw new TypeError("callback is not a function")

    //validamos si el usuario existe primero antes de insertar el post

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
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Agrega cero al mes si es de un solo dígito
        const dia = fechaActual.getDate().toString().padStart(2, '0'); // Agrega cero al día si es de un solo dígito
        const hora = fechaActual.getHours().toString().padStart(2, '0'); // Agrega cero a la hora si es de un solo dígito
        const minutos = fechaActual.getMinutes().toString().padStart(2, '0'); // Agrega cero a los minutos si es de un solo dígito

        const fechaFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}`;

        const post = {
            //id: Date.now(),-> ya lo maneja data 
            //author: sessionStorage.username,-> la logica tendra que recibir el username ya que no usamos sessionStorge aqui.
            author: username,
            title,
            image,
            description,
            date: fechaFormateada
        };

        data.insertPost(post, error => {
            if (error) {
                callback(error)

                return
            }
            callback(null)
        })
    })
}

//logic.getLoggedInUsername = () => sessionStorage.username

export default createPost