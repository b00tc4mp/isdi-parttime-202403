import errors from 'com/errors'
import validate from 'com/validate'



const loginUser = (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)


    /*
    const xhr = new XMLHttpRequest

    xhr.onload = () => {

        if (xhr.status === 200) {
            // sessionStorage.username = username

            const token = JSON.parse(xhr.response)
            sessionStorage.token = token

            callback(null)

            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)

    const body = { username, password }

    const json = JSON.stringify(body)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(json)*/

    fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({ username, password })
    })
        .then(response => { // respuesta de la api
            if (response.status === 200) {
                callback(null)

                return response.json()      //La respuesta la convertmos de json a objeto, es decir, a JavaScript
                    .then(token => {
                        sessionStorage.token = token

                        callback(null)
                    })

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







export default loginUser
