import "dotenv/config"
import logic from "../logic/index.js"
import jwt from "../utils/jsonwebtoken-promised.js"
import { CredentialsError } from "com/errors.js"
import errorResponse from "../helper/errorResponse.js"

const { JWT_SECRET } = process.env

export default (req, res) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then(payload => {
        const { sub: userId } = payload

        const { title } = req.body

        const { postId } = req.params
        try {

          logic.editPostTitle(userId, postId, title)
            .then(() => {
              res.status(200).send()
            })
            .catch(error => errorResponse(error, res))

        } catch (error) {
          errorResponse(error, res)
        }
      })
      .catch(error => errorResponse(new CredentialsError(error, res)))
  } catch (error) {
    errorResponse(error, res)
  }
}
