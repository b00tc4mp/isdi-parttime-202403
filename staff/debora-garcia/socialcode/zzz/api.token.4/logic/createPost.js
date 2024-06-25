import data from "../data/index.js" // importamos el objeto data
import { MatchError } from "com/errors.js"
import validate from "com/validate.js"

//enviamos el usuario que es lo que identifica de forma unica al usuario, luego usaremos id
//la api no sabe que usuario esta conectado (stateless), y para crear un post tiene que saber a que usuario hay que asociar el post
const createPost = (username, title, image, description, callback) => {
    validate.username(username)
    validate.text(title, "title", 50)
    validate.url(image, "image")
    validate.text(description, "description", 500)
    validate.callback(callback)

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