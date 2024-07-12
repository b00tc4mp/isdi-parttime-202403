import logic from '../logic/index.js'
import handleErrorResponse from '../helper/handleErrorResponse.js'


const registerUserHandler = (req, res) => {
    const { name, surname, email, username, password, passwordRepeat } = req.body

    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => {
                handleErrorResponse(error, res)
            })
    } catch (error) {
        handleErrorResponse(error, res)
    }
}

export default registerUserHandler

