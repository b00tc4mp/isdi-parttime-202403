import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'


const registerUser = (name, surname, email, phone, password, passwordRepeat) => {

    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.phone(phone)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)


    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, email, phone, password, passwordRepeat })
    })
        .catch(() => { throw new SystemError('network error') })
        .then(response => {
            if (response.status === 201) return

            return response.json()
                .catch(() => { throw new SystemError('network error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default registerUser