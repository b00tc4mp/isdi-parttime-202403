import "dotenv/config"
import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { SystemError } from "com/errors.js"

const { JWT_SECRET } = process.env

export default (req, res, next) => {
  try {
    const { username, password } = req.body

    logic.authenticateUser(username, password)
      .then((userId) => {
        jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "7d" })
          .then((token) => {
            res.json(token)
            console.log(`User ${username} authenticated`)
          })
          .catch((error) => next(new SystemError(error.message)))
      })
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
}

