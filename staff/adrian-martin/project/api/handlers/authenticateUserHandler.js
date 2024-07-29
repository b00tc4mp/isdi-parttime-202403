import logic from "../logic/index.js"
import jwt from '../util/jsonwebtoken-promised.js'

import { SystemError } from "com/errors"
const { JWT_SECRET } = process.env

export default (req, res, next) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(userId => {
                jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' })
                    .then(token => {
                        console.log(`User ${username} authenticated`)

                        res.json(token)
                    })
                    .catch(error => next(new SystemError(error.message)))
            })
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}