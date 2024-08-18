import 'dotenv/config'
import logic from "../logic/index.js"
import jwt from '../utils/jsonwebtoken-promised.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    try {
        const { name, username, email, password, avatar } = req.body

        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload
                try {
                    logic.registerUser(userId, name, username, email, password, avatar)
                        .then(() => res.status(201).send())
                        .catch(error => {
                            next(error)
                        })
                } catch (error) {
                    next(error)
                }
            })
    } catch (error) {
        next(error)
    }
}
