import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'

import { CredentialsError, SystemError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {

    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                try {
                    logic.getAllCustomers(userId)
                        .then(customers => res.json(customers))
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