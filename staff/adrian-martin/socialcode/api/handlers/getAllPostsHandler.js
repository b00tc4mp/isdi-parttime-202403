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

                try {
                    logic.getAllPosts(userId)
                        .then(posts => res.json(posts))
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