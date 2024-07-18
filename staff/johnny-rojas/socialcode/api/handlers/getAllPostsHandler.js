import 'dotenv/config'
import logic from '../logic/index.js'
import jwt from '../util/jsonwebtoken-promised.js'
import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env


const getAllPostsHandler = (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                try {
                    logic.getAllPosts(userId)
                        .then(posts => res.json(posts))
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

export default getAllPostsHandler