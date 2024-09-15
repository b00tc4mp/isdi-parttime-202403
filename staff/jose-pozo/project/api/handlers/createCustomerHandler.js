import 'dotenv/config'

import jwt from '../util/jsonwebtoken-promised.js'

import logic from "../logic/index.js"

import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default ((req, res, next) => {

    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { name, surname, email } = req.body

                try {
                    logic.createCustomer(userId, name, surname, email)
                        .then(() => res.status(201).json())
                        .catch(error => next(error))
                } catch (error) {
                    next(error)
                }
            })
            .catch(error => new CredentialsError(error.message))
    } catch (error) {
        next(error)
    }
})