import "dotenv/config"
import handleErrorResponse from "../helper/handlerErrorResponse.js"
import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { SystemError, CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

const authenticateUserHandler = (req, res) => {
    //ahora ya hay separacion de responsabilidades con lo que no usamos data en este archivo
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(userId =>
                jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "7d" })
                    .then(token => res.json(token))
                    .catch(error => handleErrorResponse(new SystemError(error.message), res))
            )
            .catch(error => handleErrorResponse(new CredentialsError(error.message), res))
    } catch (error) {
        handleErrorResponse(error, res)
    }
}
export default authenticateUserHandler