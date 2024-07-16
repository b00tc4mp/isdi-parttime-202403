import logic from "../logic/index.js"

import jwt from '../utils/jsonwebtoken-promised.js'

import { CredentialError } from "com/error.js"

import { JWT_SECRET } from process.env

export default (req, res, next) => {

    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { targetUserId } = req.params

                try {
                    logic.getUserName(userId, targetUserId)
                        .then(name => res.json(name))
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