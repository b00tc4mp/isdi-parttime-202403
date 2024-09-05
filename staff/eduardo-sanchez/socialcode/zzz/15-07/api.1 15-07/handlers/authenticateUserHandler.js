import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'

import { SystemError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(userId =>
                jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' })
                    .then(token => res.json(token))
                    .catch(error => next(new SystemError(error.message)))
            )
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}

/*
import "dotenv/config"
import logic from "../logic/index.js"
import jwt from "../util/jsonwebtoken-promised.js"
import { SystemError } from "com/errors.js"
import handleErrorResponse from "../helper/handleErrorResponse.js"

const { JWT_SECRET } = process.env

const authenticateUserHandler = (req, res) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(userId =>
                jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' })
                    .then(token => res.json(token))
                    .catch(error => handleErrorResponse(new SystemError(error.message), res))
            )
            .catch(error => handleErrorResponse(error, res))
    } catch (error) {
        handleErrorResponse(error, res)
    }
}

export default authenticateUserHandler
*/