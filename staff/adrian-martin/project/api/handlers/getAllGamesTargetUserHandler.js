import jwt from '../util/jsonwebtoken-promised.js'
const { JWT_SECRET } = process.env
import logic from '../logic/index.js'
import { CredentialError } from 'com/errors.js'

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload
                const { targetUserId } = req.params

                try {
                    logic.getAllGamesTargetUser(userId, targetUserId)
                        .then(games => res.json(games))
                        .catch(error => next(error))
                } catch (error) {
                    next(error)
                }
            })
            .catch(error => next(new CredentialError(error.message)))
    } catch (error) {
        next(error)
    }
}