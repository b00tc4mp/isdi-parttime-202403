import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const registerUser = (name, surname, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    // const xhr = new XMLHttpRequest

    // xhr.onload = () => {
    //     if (xhr.status === 201) {
    //         callback(null)

    //         return
    //     }

    //     const { error, message } = JSON.parse(xhr.response)

    //     const constructor = errors[error]

    //     callback(new constructor(message))
    // }

    // xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)

    // const body = { name, surname, email, username, password, passwordRepeat }

    // const json = JSON.stringify(body)

    // xhr.setRequestHeader('Content-Type', 'application/json')
    // xhr.send(json)
    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, email, username, password, passwordRepeat })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201) return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })

}

export default registerUser