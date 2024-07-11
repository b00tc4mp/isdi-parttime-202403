import errors from 'com/errors'
import validate from 'com/validate'



const loginUser = (username, password) => {
    validate.username(username)
    validate.password(password)

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

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({ username, password })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => { // respuesta de la api
            if (response.status === 200) {

                return response.json()      //La respuesta la convertmos de json a objeto, es decir, a JavaScript
                    .catch(error => { throw new SystemError('server error') })
                    .then(token => {
                        sessionStorage.token = token

                        return token
                    })

            }


            return response.json()
                .catch(error => { throw new SystemError(error.message) }) // si la respuesta response.json() falla
                .then(body => {           // respuesta en forma de objeto porque lo transformamos a json(). (({error es el nombre de la constructora de error y message es el mensaje de error}))
                    const { error, message } = body

                    const constructor = errors[error]           //A partir del nombre de la constructora traemos la constructora a const constructor puesto que errors[error] es un objeto en el que están todas las constructoras de error

                    throw new constructor(message)       // reconstruyo el error con el mensaje que me viene de la api
                })

        })

}







export default loginUser
