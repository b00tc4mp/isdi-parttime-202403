import jwt from '../util/jsonwebtoken-promised.js'

import { SystemError } from 'com/errors.js'

import logic from '../logic/index.js'

const { JWT_SECRET } = process.env

const toggleLikeHundler = (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { postId } = req.params

                try {
                    logic.toggleLike(userId, postId)
                        .then(() => res.status(204).send())
                        .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
                } catch (error) {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                }

            })
            .catch(error => {
                if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    res.status(500).json({ error: SystemError.name, message: error.message })


                } else
                    res.status(500).json({ error: error.constructor.name, message: error.message })

            })
    } catch (error) {

        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
}

export default toggleLikeHundler