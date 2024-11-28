import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'

const { JWT_SECRET } = process.env

const getAllPostsHandler = (req, res, next) => {
    try {

        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                try {
                    logic.getAllPosts(userId)
                        .then(posts => res.json(posts))
                        .catch(error => next(error))

                } catch (error) {
                    next(error)

                }
            })
            .catch(error => {
                if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    res.status(500).json({ error: SystemError.name, message: error.message })


                } else
                    next(error)

            })
    } catch (error) {
        {
            next(error)
        }

    }
}

export default getAllPostsHandler