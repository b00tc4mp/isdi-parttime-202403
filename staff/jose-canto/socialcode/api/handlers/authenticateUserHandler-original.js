import "dotenv/config"
import handleErrorResponse from "../helper/handleErrorResponse.js"
import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { SystemError } from "com/errors.js"

const { JWT_SECRET } = process.env

const authenticaterUserHandler = (req, res) => {
  try {
    const { username, password } = req.body

    logic.authenticateUser(username, password)
      .then((userId) => {
        jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "7d" })
          .then((token) => {
            res.json(token)
            console.log(`User ${username} authenticated`)
          })
          .catch((error) => handleErrorResponse(new SystemError(error.message), res))
      })
      .catch((error) => handleErrorResponse(error, res))
  } catch (error) {
    handleErrorResponse(error, res)
  }
}

export default authenticaterUserHandler