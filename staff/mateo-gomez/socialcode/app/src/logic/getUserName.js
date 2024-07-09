import errors, { SystemError } from 'com/errors'
import validate from 'com/validate.js'

import extractPayloadFromJWT from '../utils/extractPayloadFromJWT.js'


const getUserName = () => {
    /* const user = data.findUser(user =>
         user.username === sessionStorage.username)
 
     return user.name*/


    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)


    /*
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        if (xhr.status === 200) {
            const name = JSON.parse(xhr.response)

            callback(null, name)
            return
        }

        const { error, message } = JSON.parse(xhr.response)

        const constructor = errors[error]

        callback(new constructor(message))
    }
    xhr.open('GET', `${import.meta.env.VITE_API_URL}/users/${userId}`)

    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)

    xhr.send()
*/


    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`         //Authorization no hace falta que vayta entre comillas porque no tiene guion en medio
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => { // respuesta de la api
            if (response.status === 200) {


                return response.json()      //La respuesta la convertmos de json a objeto, es decir, a JavaScript
                    .catch(error => { throw new SystemError(error.message) })
                    .then(name => {             //Esperamos como respuesta el name
                        { return name }
                    })

            }


            return response.json()
                .catch(error => { throw new SystemError(error.message) }) // si la respuesta response.json() falla
                .then(body => {           // respuesta en forma de objeto porque lo transformamos a json(). (({error es el nombre de la constructora de error y message es el mensaje de error}))
                    const { error, message } = body

                    const constructor = errors[error]           //A partir del nombre de la constructora traemos la constructora a const constructor puesto que errors[error] es un objeto en el que están todas las constructoras de error

                    throw new constructor(message)         // reconstruyo el error con el mensaje que me viene de la api
                })
        })
}


export default getUserName
