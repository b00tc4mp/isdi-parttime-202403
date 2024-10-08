import { CredentialsError } from 'com/errors.js'
import logic from '../logic/index.js'
import jwt from '../util/jsonwebtoken-promised.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { activityId, word, answers } = req.body
                try {
                    logic.createVocabulary(userId, activityId, word, answers)
                        .then(() => res.status(201).send())
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