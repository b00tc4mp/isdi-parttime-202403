import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'

import { SystemError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    const { email, password } = req.body

    try {
        logic.authenticateUser(email, password)
            .then(user =>
                jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' })
                    .then(token => res.json(token))
                    .catch(error => next(new SystemError(error.message)))
            )
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}