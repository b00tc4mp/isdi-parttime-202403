import 'dotenv/config'
import logic from '../logic/index.js'
import jwt from '../util/jsonwebtoken-promised.js'
import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

const createPostHandler = (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { title, image, description } = req.body

                try {
                    logic.createPost(userId, title, image, description)
                        .then(() => res.status(201).send())
                        .catch(error => next(error, res))
                } catch (error) {
                    next(error, res)
                }
            })
            .catch(error => next(new CredentialsError(error.message), res))

    } catch (error) {
        next(error, res)
    }
}

export default createPostHandler