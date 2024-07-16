import "dotenv/config"
import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { CredentialsError } from "com/errors.js"
import errorResponse from "../helper/errorResponse.js"

const { JWT_SECRET } = process.env

export default (req, res) => {
  try {
    const token = req.headers.authorization.slice(7) // cabezera para la autenticacion del usuario

    jwt.verify(token, JWT_SECRET)
      .then((payload) => {
        const { sub: userId } = payload

        const { title, image, description, } = req.body

        try {
          logic.createPost(userId, title, image, description)
            .then(() => {
              res.status(201).send()
            })
            .catch(() => {
              errorResponse(error, res)
            })
        } catch (error) {
          errorResponse(error, res)
        }
      })
      .catch((error) => errorResponse(new CredentialsError(error.message), res))
  } catch (error) {
    errorResponse(error, res)
  }
}
