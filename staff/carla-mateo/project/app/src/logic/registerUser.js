import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const registerUser = (name, username, email, password, avatar) => {
    validate.name(name)
    validate.username(username)
    validate.email(email)
    validate.password(password)



    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`
        },
        body: JSON.stringify({ name, username, email, password, avatar })
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