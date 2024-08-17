import 'dotenv/config'
import logic from '../logic/index.js'
import jwt from '../util/jsonwebtoken-promised.js'
import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const updates = req.body
        const { recipeId } = req.params


        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload
                try {
                    logic.editRecipe(userId, recipeId, updates)
                        .then(recipeEdited => {
                            res.status(200).send(recipeEdited)
                        })
                        .catch(error => next(error))
                } catch (error) {
                    next(error)
                }
            })
            .catch(error => next(new CredentialsError(error.message)))

    } catch (error) {
        next(error)
    }
}
