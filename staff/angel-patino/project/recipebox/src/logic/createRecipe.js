import { SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createRecipe = (title, thumbnail, cookTime, ingredients, description) => {
    validate.text(title, 'title', 30)
    validate.url(thumbnail, 'thumbnail')
    validate.number(cookTime, 'cookTime')
    validate.ingredientArray(ingredients, 'ingredients', 30)
    validate.text(description, 'description', 200)

    return fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, thumbnail, cookTime, ingredients, description })
    })

        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201)
                return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    // console.log(body)
                    const { error, message } = body

                    const constructor = error[error]

                    throw new constructor(message)
                })
        })


}

export default createRecipe
