import 'dotenv/config'
import logic from '../logic/index.js'
import handleErrorResponse from '../helper/handleErrorResponse.js'
import jwt from '../util/jsonwebtoken-promised.js'
import { SystemError } from 'com/errors.js'

const { JWT_SECRET } = process.env

const authenticateUserHandler = (req, res) => {
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(userId =>
                jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '23h' })
                    .then(token => res.json(token))
                    .catch(error => handleErrorResponse(new SystemError(error.message), res))
            )
            .catch(error => handleErrorResponse(error, res))
    } catch (error) {
        handleErrorResponse(error, res)
    }
}

export default authenticateUserHandler