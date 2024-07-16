import "dotenv/config"
import logic from "../logic/index.js"
import errorResponse from "../helper/errorResponse.js"
import { CredentialsError } from "com/errors.js"
import jwt from "../utils/jsonwebtoken-promised.js"

const { JWT_SECRET } = process.env

export default (req, res) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then((payload) => {
        const { sub: userId } = payload

        const { postId } = req.params

        const { text } = req.body

        try {
          logic.createPostComment(userId, postId, text)
            .then(() => {
              res.status(201).send()
            })
            .catch((error) => {
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
