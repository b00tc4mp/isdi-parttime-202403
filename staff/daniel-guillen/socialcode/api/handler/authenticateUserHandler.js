import 'dotenv/config'
import handleErrorResponse from "../helper/handleErrorResponse.js"
import logic from './logic/index.js'
import { SystemError } from 'com/errors.js'
import jwt from './util/jwt-promised.js'

const { JWT_SECRET } = process.env

const authenticateUser = (req,res) => {
    try {
        const {username, password} = req.body

        logic.authenticateUser(username, password)
            .then(userId =>
                jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' })
                    .then(token => {
                        res.json(token)
                        console.log('User authenticated')
                    })
                )
                .catch(error => handleErrorResponse(new SystemError(error.message), res))
    } catch (error) {
        handleErrorResponse(error, res)
    }
}

export default authenticateUserHandler