import 'dotenv/config'
import logic from '../logic/index.js'
import jwt from '../util/jsonwebtoken-promised.js'
import { SystemError } from 'com/errors.js'

const { JWT_SECRET } = process.env

const authenticateUserHandler = (req, res, next) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(userId =>
                jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7d' })
                    .then(token => res.json(token))
                    .catch(error => next(new SystemError(error.message), res))
            )
            .catch(error => next(error, res))
    } catch (error) {
        next(error, res)
    }
}

export default authenticateUserHandler