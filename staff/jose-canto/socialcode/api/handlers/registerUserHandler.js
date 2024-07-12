import handleErrorResponse from "../helper/handleErrorResponse.js"
import logic from "../logic/index.js"

const registerUserHandler = ((req, res) => {
  try {
    const { name, surname, email, username, password, passwordRepeat } = req.body

    logic.registerUser(name, surname, email, username, password, passwordRepeat)
      .then(() => res.status(201).send())
      .catch((error) => handleErrorResponse(error, res))
  } catch (error) {
    handleErrorResponse(error, res)
  }
})

export default registerUserHandler