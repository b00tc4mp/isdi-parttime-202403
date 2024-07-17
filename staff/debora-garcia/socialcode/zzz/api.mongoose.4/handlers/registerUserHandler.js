import handleErrorResponse from "../helper/handlerErrorResponse.js"
import logic from "../logic/index.js"

const registerUserHandler = (req, res) => {
    const { email, username, password, passwordRepeat } = req.body

    try {
        logic.registerUser(email, username, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => handleErrorResponse(error, res))
    } catch (error) {
        handleErrorResponse(error, res)
    }
}
export default registerUserHandler

