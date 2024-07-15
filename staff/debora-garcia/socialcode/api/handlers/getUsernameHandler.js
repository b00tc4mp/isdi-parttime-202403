import "dotenv/config"
import handleErrorResponse from "../helper/handlerErrorResponse.js"
import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { CredentialsError } from 'com/errors.js'


const { JWT_SECRET } = process.env
const getUsernameHandler = (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)
        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { targetUserId } = req.params

                try {
                    logic.getUsername(userId, targetUserId)
                        .then(username => res.json(username))
                        .catch(error => handleErrorResponse(error, res))
                } catch (error) {
                    handleErrorResponse(error, res)
                }
            })
            .catch(error => handleErrorResponse(new CredentialsError(error.message), res))
    } catch (error) {
        handleErrorResponse(error, res)
    }
}

export default getUsernameHandler