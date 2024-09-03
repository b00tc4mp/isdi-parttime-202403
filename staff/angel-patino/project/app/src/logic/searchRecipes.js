import errors, { SystemError } from 'com/errors.js'
import validate from 'com/validate'

const searchRecipes = (query) => {
    validate.text(query, 'query', 50)

    return fetch(`${import.meta.env.VITE_API_URL}/recipes/search`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })

        .then(response => {
            if (response.status === 200) return

            return response.json()
                .catch(() => { throw new SystemError('Server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
        .catch(error => {
            throw new SystemError(error.message)
        })

}
export default searchRecipes