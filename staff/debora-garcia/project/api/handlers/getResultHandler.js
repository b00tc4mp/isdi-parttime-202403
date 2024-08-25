import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { CredentialsError } from "com/errors.js"

const { JWT_SECRET } = process.env

const getResultHandler = (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload
                const { resultId } = req.params

                try {
                    logic.getResult(userId, resultId)
                        .then(result => res.json(result))
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

export default getResultHandler