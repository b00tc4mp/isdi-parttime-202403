import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const modifyUser = (name, surname, email, phone, avatar, password, passwordRepeat) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.phone(phone)
    validate.url(avatar)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return fetch(`${import.meta.env.VITE_API_URL}/users/modify`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, image, description })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 204) 
                return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default modifyUser