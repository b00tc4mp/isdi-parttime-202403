import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const createOrderSentence = (activityId, sentence, translate) => {
    validate.id(activityId, 'activityId')
    validate.text(sentence, 'sentence', 200)
    validate.text(translate, 'translate', 200)

    return fetch(`${import.meta.env.VITE_API_URL}/exercise/order-sentence`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ activityId, sentence, translate })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201)
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

export default createOrderSentence