import errorResponse from "../helper/errorResponse.js"
import logic from "../logic/index.js"

export default ((req, res) => {
  try {
    const { name, surname, email, username, password, passwordRepeat } = req.body

    logic.registerUser(name, surname, email, username, password, passwordRepeat)
      .then(() => res.status(201).send())
      .catch((error) => errorResponse(error, res))
  } catch (error) {
    errorResponse(error, res)
  }
})

