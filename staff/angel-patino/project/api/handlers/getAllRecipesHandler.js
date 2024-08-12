import logic from '../logic/index.js'
import { CredentialsError } from '../../com/errors.js'
import jwt from '../util/jsonwebtoken-promised.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(toke, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                try {
                    logic.getAllRecipes(userId)
                        .then(recipes => res.json(recipes))
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