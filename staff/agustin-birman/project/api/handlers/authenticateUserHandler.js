import logic from '../logic/index.js'
import jwt from '../util/jsonwebtoken-promised.js'
import { SystemError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(user => {
                const { id: userId, role } = user

                jwt.sign({ sub: userId, role }, JWT_SECRET, { expiresIn: '1h' })
                    .then(token => res.json(token))
                    .catch(error => {
                        next(new SystemError(error.message))
                    })
            })
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}