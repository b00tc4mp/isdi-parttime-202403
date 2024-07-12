import "dotenv/config"
import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import handleErrorResponse from "../helper/handleErrorResponse.js"
import { CredentialsError } from "com/errors.js"

const { JWT_SECRET } = process.env

const getPostCommentsHandler = (req, res) => {

  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then((payload) => {
        const { sub: userId } = payload

        const { postId } = req.params

        try {
          logic.getPostComments(userId, postId)
            .then((comments) => {
              res.json(comments)
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

export default getPostCommentsHandler