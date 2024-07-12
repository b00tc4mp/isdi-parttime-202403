import "dotenv/config"
import logic from "../logic/index.js"
import handleErrorResponse from "../helper/handleErrorResponse.js"
import { CredentialsError } from "com/errors.js"
import jwt from "../utils/jsonwebtoken-promised.js"

const { JWT_SECRET } = process.env

const createPostCommentHandler = (req, res) => {

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
              handleErrorResponse(error, res)
            })
        } catch (error) {
          handleErrorResponse(error, res)
        }
      })
      .catch((error) => handleErrorResponse(new CredentialsError(error.message), res))
  } catch (error) {
    handleErrorResponse(error, res)
  }
}

export default createPostCommentHandler