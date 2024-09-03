import logic from "../logic/index.js"
import { CredentialsError, NotFoundError, SystemError } from "com/errors.js"
import jwt from "../util/jsonwebtoken-promised.js"

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload
                const { recipeId } = req.params

                logic.getRecipeById(recipeId)
                    .then(recipe => {
                        if (!recipe) {
                            throw new NotFoundError('Recipe not found')
                        }

                        if (recipe.author.id !== userId) {
                            throw new CredentialsError('Forbidden: You do not have accces to this recipe')
                        }

                        res.status(200).json(recipe)
                    })
                    .catch(error => next(error))
            })
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}