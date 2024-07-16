import "dotenv/config"
import logic from "../logic/index.js"
import errorResponse from "../helper/errorResponse.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { CredentialsError } from "com/errors.js"

const { JWT_SECRET } = process.env

export default (req, res) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then((payload) => {
        const { sub: userId } = payload

        const { postId } = req.params

        try {
          logic.toggleLikePost(userId, postId)
            .then(() => {
              res.status(204).send()
            })
            .catch((error) => errorResponse(error, res))
        } catch {
          errorResponse(error, res)
        }
      })
      .catch((error) => errorResponse(new CredentialsError(error.message), res))
  } catch (error) {
    errorResponse(error, res)
  }
}