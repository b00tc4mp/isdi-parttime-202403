import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { SystemError } from "com/errors.js"

const { JWT_SECRET } = process.env

const authenticateUserHandler = (req, res, next) => {
    //ahora ya hay separacion de responsabilidades con lo que no usamos data en este archivo
    const { username, password } = req.body

    try {
        logic.authenticateUser(username, password)
            .then(userId =>
                jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "7d" })
                    .then(token => res.json(token))
                    .catch(error => next(new SystemError(error.message)))
            )
            .catch(error => next(error))
        
    } catch (error) {
        next(error)
    }
}
export default authenticateUserHandler