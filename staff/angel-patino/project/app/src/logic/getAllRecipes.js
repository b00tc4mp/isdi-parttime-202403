import errors, { SystemError } from 'com/errors.js'

const getAllRecipes = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then(recipes => recipes)

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)

                })
        })
}

export default getAllRecipes