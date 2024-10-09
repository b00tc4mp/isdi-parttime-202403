import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createAd = (title, description, price) => {
    validate.text(title, 'title', 50)
    validate.text(description, 'description', 200)
    validate.price(price, 'price')

    // throw new SystemError('not implemented')

    return fetch(`${import.meta.env.VITE_API_URL}/ads`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.token}`
        },
        body: JSON.stringify({ title, description, price })
    })
        .catch(() => { throw new SystemError('server connection error') })
        .then(res => {
            if (res.status === 201) {
                console.log(`Ad ${title} created`)
                return
            }

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
                .catch(() => { throw new SystemError('server conection error') })
        })
}

export default createAd