import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'


const createPostComment = (postId, comment, callback) => {
    validate.id(postId, 'postId')
    validate.text(comment, 'comment', 150)
    validate.callback(callback)

    fetch(`${import.meta.env.VITE_API_URL} / posts / comment`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId, comment })
    })
        .then(response => { // respuesta de la api
            if (response.status === 201) {
                callback(null)

                return
            }

            return response.json()
                .then(body => {           // respuesta en forma de objeto porque lo transformamos a json(). (({error es el nombre de la constructora de error y message es el mensaje de error}))
                    const { error, message } = body

                    const constructor = errors[error]           //A partir del nombre de la constructora traemos la constructora a const constructor puesto que errors[error] es un objeto en el que están todas las constructoras de error

                    callback(new constructor(message))          // reconstruyo el error con el mensaje que me viene de la api
                })
                .catch(error => callback(new SystemError(error.message))) // si la respuesta response.json() falla
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default createPostComment
