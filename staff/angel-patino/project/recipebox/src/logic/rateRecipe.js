import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const rateRecipe = (recipeId, rating) => {
    validate.id(recipeId, 'recipeId')
    validate.number(rating, 'rating', { min: 1, max })

    return fetch(`${import.meta.env.VITE_API_URL}/recipes/${recipeId}/ratings`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating })

    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 204) return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default rateRecipe