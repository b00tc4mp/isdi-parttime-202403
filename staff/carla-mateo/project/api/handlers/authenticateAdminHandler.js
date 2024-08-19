import "dotenv/config"
import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { SystemError } from "com/errors.js"

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    const { username, password } = req.body

    try {
        logic.authenticateAdmin(username, password)
            .then(user => {
                const { id, role } = user

                return jwt.sign({ sub: id, role }, JWT_SECRET, { expiresIn: '20d' })
                    .then(token => res.json(token))
                    .catch(error => next(new SystemError(error.message)))
            })
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}