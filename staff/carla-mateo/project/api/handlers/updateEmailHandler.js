import 'dotenv/config'
import jwt from '../utils/jsonwebtoken-promised.js'
import logic from '../logic/index.js'
import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { email } = req.body
                try {
                    logic.updateEmail(userId, email)
                        .then(() => {
                            res.status(200).json()
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