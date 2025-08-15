import "dotenv/config"
//import handleErrorResponse from "../helper/handlerErrorResponse.js"
import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env
const deletePostHandler = (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { postId } = req.params

                try {
                    logic.deletePost(userId, postId)
                        .then(() => res.status(204).send())
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

export default deletePostHandler