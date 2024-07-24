//import handleErrorResponse from "../helper/handlerErrorResponse.js"
import logic from "../logic/index.js"

const registerUserHandler = (req, res, next) => {
    const { email, username, password, passwordRepeat } = req.body

    try {
        logic.registerUser(email, username, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}
export default registerUserHandler

