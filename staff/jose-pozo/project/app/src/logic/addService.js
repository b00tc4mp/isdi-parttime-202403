import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const addService = (name, description, category, duration, price) => {
    validate.text(name, 'name')
    validate.number(duration)
    validate.number(price)

    if (description) { validate.text(description, 'description') }
    if (category) { validate.text(category, 'category') }

    return fetch(`${import.meta.env.VITE_API_URL}/users/services`, {
        method: 'POST',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,

            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            category,
            duration,
            price
        })
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

export default addService
