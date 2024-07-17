import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {

    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET, (error, payload) => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            const { sub: userId } = payload

            const { postId } = req.params

            const { textComment } = req.body

            logic.createComment(userId, textComment, postId, (error) => {
                if (error) {
                    res.status(500).json({ error: error.constructor.name, message: error.message })
                    return
                }
                res.status(201).send()
            })
        })

    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
}