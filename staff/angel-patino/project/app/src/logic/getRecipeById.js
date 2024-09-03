import errors, { SystemError } from 'com/errors.js'

const getRecipeById = (recipeId) => {
    return fetch(`${import.meta.env.VITE_API_URL}/recipes/${recipeId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
        },
    })
        .catch(() => {
            throw new SystemError('server error');
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => {
                        throw new SystemError('Failed')
                    })
            } else {

                return response.json().catch(() => {
                    throw new SystemError('server error');
                })
                    .then(body => {
                        const { error, message } = body

                        const constructor = errors[error]
                        throw new constructor(message)
                    })
            }
        })
        .catch(error => {
            if (error instanceof SystemError) {
                throw error
            } else {
                throw new SystemError('Server error')
            }
        })
}

export default getRecipeById;
