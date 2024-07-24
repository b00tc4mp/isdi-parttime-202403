import "dotenv/config"
//import handleErrorResponse from "../helper/handlerErrorResponse.js"
import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

const getPostsHandler = (req, res, next) => {
    try {
        //añadimos que pida username para poder accedir a los posts
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload
                try {
                    logic.getPosts(userId)
                        .then(posts => res.json(posts))
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

export default getPostsHandler