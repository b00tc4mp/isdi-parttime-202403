import { CredentialError } from "com/errors.js"
import logic from "../logic/index.js"
import jwt from '../util/jsonwebtoken-promised.js'
const { JWT_SECRET } = process.env


export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { title, image, rating, hours } = req.body

                try {
                    logic.createGame(userId, title, image, rating, hours)
                        .then(() => res.status(201).send())
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