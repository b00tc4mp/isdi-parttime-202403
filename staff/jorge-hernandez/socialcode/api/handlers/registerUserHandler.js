import handleErrorResponse from '../handlers/helper/handleErrorResponse.js'

import logic from '../logic/index.js'

export default (req, res) => {
  const { name, surname, email, username, password, passwordRepeat } = req.body

  try {
    logic
      .registerUser(name, surname, email, username, password, passwordRepeat)
      .then(() => res.status(201).send())
      .catch((error) => {
        handleErrorResponse(error, res)
      })
  } catch (error) {
    handleErrorResponse(error, res)
  }
}
