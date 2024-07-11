import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'


const registerUser = (name, surname, email, username, password, passwordRepeat) => {
    //Input validation
    validate.name(name)
    validate.surname(surname)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)


    //Aquí lo haciamos con xhr pero lo cambiamos a getch() para poder hacer uso de las promesas
    /* 
    const xhr = new XMLHttpRequest

    xhr.onload = () => {

        if (xhr.status === 201) {
            callback(null)

            return
        }

        try {
            const { error, message } = JSON.parse(xhr.response)

            const constructor = errors[error]

            callback(new constructor(message))

        } catch (error) {
            callback(new SystemError(error.message))
        }


    }

    xhr.onerror = () => callback(new SystemError('network error')) // Este error se coloca aquí para prevenir un posible error surgido de un error de internet, o que la api se haya caído 

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)

    const body = { name, surname, email, username, password, passwordRepeat }

    const json = JSON.stringify(body)

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(json)

    */


    //Ahora utilizamso la lógica con fetch() para utilizar las promesas

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({ name, surname, email, username, password, passwordRepeat })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => { // respuesta de la api
            if (response.status === 201) {

                return
            }

            return response.json()
                .catch(error => { throw new SystemError('server error') }) // si la respuesta response.json() falla
                .then(body => {           // respuesta en forma de objeto porque lo transformamos a json(). (({error es el nombre de la constructora de error y message es el mensaje de error}))
                    const { error, message } = body

                    const constructor = errors[error]           //A partir del nombre de la constructora traemos la constructora a const constructor puesto que errors[error] es un objeto en el que están todas las constructoras de error

                    throw new constructor(message)
                })

        })

}

export default registerUser
