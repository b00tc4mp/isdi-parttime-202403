import "dotenv/config"
import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { CredentialsError } from "com/errors.js"

const { JWT_SECRET } = process.env
const createPostHandler = (req, res, next) => {
    try {

        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { workoutId, image, description, time, repetitions, weight } = req.body

                try {
                    logic.createPost(userId, workoutId, image, description, time, repetitions, weight)
                        .then(() => {
                            res.status(201).json({})
                        })
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

export default createPostHandler