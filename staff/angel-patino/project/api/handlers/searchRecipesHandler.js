import 'dotenv/config'
import logic from '../logic/index.js'
import jwt from '../util/jsonwebtoken-promised.js'
import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)
        const { query } = req.body

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                try {
                    logic.searchRecipes(userId, query)
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