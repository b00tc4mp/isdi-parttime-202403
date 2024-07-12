import "dotenv/config"
import logic from "../logic/index.js"
import { CredentialsError } from "com/errors.js"
import jwt from "../utils/jsonwebtoken-promised.js"

const { JWT_SECRET } = process.env


const getAllPostsHandler = (req, res) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then((payload) => {
        const { sub: userId } = payload

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 2

        try {
          logic.getAllPosts(userId, page, limit)
            .then((posts) => {
              res.json(posts)
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

export default getAllPostsHandler