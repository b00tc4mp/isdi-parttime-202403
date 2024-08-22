import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const editRecipe = (recipeId, updates) => {
    validate.id(recipeId, 'recipedId')

    if (updates.title) validate.text(updates.title)
    if (updates.thumbnail) validate.url(updates.thumbnail)
    if (updates.cookTime) validate.number(updates.cookTime)
    if (updates.ingredients) validate.ingredientArray(updates.ingredients)
    if (updates.description) validate.text(updates.description)
    // if (updates.reting) validate.rating(updates.rating)


    return fetch(`${import.meta.env.VITE_API_URL}/recipes/${recipeId}/edit`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'applicatuib/json',
            Authorization: `Bearer ${sessionStorage.token}`,
        },
        body: JSON.stringify(updates)
    })
        .catch(() => {
            throw new SystemError('Failed to connect to server')
        })
        .then((response) => {
            if (response.status === 200) return
            return response.json()
                .catch(() => {
                    throw new SystemError('Invalid server response')
                })
                .then((body) => {
                    const { error, message } = body
                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })


}
export default editRecipe
