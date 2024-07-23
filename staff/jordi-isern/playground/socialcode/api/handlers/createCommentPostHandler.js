import 'dotenv/config'

import logic from '../logic/index.js'
import jwt from '../util/jsonwebtoken-promised.js'

import handleErrorResponse from '../helper/handleErrorResponse.js'

const {JWT_SECRET} = process.env

const createCommentPostHandler = (req, res) => {
    try{
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const{sub: userId} = payload

                const {postId} = req.params

                const {comment} = req.body

                try{
                    logic.createPostComment(userId, postId, comment)
                        .then(() => res.status(201).send())
                        .catch((error) => handleErrorResponse(error,res))
                }catch(error){
                    handleErrorResponse(error, res)
                }
            })
            .catch(error => {
                handleErrorResponse(error, res)
            })
    }
    catch(error){
        handleErrorResponse(error, res)
    }
}

export default  createCommentPostHandler