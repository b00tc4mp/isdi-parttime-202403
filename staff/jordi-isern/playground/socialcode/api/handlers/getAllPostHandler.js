import 'dotenv/config'
import logic from '../logic/index.js'

import jwt from '../util/jsonwebtoken-promised.js'

import handleErrorResponse from '../helper/handleErrorResponse.js'

const{JWT_SECRET} = process.env

const getAllPostsHandler = (req, res) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                try {
                    logic.getAllPosts(userId)
                        .then(posts => res.json(posts))
                        .catch(error => handleErrorResponse(error , res))
                } catch (error) {
                    handleErrorResponse(error, res)
                }
            })
            .catch(error => {
                handleErrorResponse(error, res)
            })
    } catch (error) {
        handleErrorResponse(error, res)
        }
}

export default getAllPostsHandler