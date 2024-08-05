import "dotenv/config"
import logic from "../logic/index.js"
import jwt from "../util/jsonwebtoken-promised.js"
import { CredentialError } from "com/errors.js"

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { username } = req.body

                try {
                    logic.editUsername(userId, username)
                        .then(user => {
                            res.status(200).send(user)
                            console.log(user)
                        })
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