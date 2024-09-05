import "dotenv/config"
import logic from "../logic/index.js"
import jwt from "../util/jsonwebtoken-promised.js"
import handleErrorResponse from "../helper/handleErrorResponse.js"
import { CredentialsError } from "com/errors.js"

const { JWT_SECRET } = process.env

const toggleLikePostHandler = ((req, res) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { postId } = req.params

                try {
                    logic.toggleLikePost(userId, postId)
                        .then(() => res.status(204).send())
                        .catch(error => handleErrorResponse(error, res))
                } catch (error) {
                    handleErrorResponse(error, res)
                }
            })
            .catch(error => handleErrorResponse(new CredentialsError(error.message), res))
    } catch (error) {
        handleErrorResponse(error, res)
    }
})

export default toggleLikePostHandler