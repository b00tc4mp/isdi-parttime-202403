import 'dotenv/config'
import logic from '../logic/index.js'

import jwt from '../util/jsonwebtoken-promised.js'

import handleErrorResponse from '../helper/handleErrorResponse.js'

const{JWT_SECRET} = process.env

const getUsernameHandler = (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { targetUserId } = req.params

                try {
                    logic.getUserName(userId, targetUserId)
                        .then(name => res.json(name))
                        .catch(error => handleErrorResponse(error, res))
                } catch (error) {
                    handleErrorResponse(error, res)
                }
            })
            .catch(error => {
                handleErrorResponse(error, res)
            })
    } catch (error) {
        handleErrorResponse(error,res)
    }
}

export default getUsernameHandler