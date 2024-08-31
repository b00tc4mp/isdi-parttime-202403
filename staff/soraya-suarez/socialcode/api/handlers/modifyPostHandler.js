import "dotenv/config"
import jwt from '../util/jsonwebtoken-promised.js'
import logic from '../logic/index.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { postId } = req.params

                const { title, image, description } = req.body

                try {
                    logic.modifyPost(userId, postId, title, image, description)
                        .then(() => res.status(200).send())
                        .catch(error => next(error))
                } catch (error) {
                    next(error)
                }
            })
            .catch(error => next(new CredentialsError(error.message)))
    } catch (error) {
        next(error)
    }
}