import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createGame = (title, image, rating, hours) => {
    validate.text(title, 'title')
    validate.url(image, 'image')
    validate.rating(rating, 'rating')
    validate.hours(hours, 'hours')

    return fetch(`${import.meta.env.VITE_API_URL}/games`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, image, rating, hours })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 201)
                return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default createGame