import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const deleteRecipe = recipeId => {
    validate.id(recipeId, 'recipeId')

    return fetch(`${import.meta.env.VITE_API_URL}/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
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

export default deleteRecipe