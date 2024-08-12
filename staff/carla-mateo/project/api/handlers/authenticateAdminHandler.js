import "dotenv/config"
import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { SystemError } from "com/errors.js"

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    const { name, password } = req.body

    try {
        logic.authenticateAdmin(name, password)
            .then(({ id }) =>
                jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '15d' })
                    .then(token => res.json(token))
                    .catch(error => next(new SystemError(error.message)))
            )
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}