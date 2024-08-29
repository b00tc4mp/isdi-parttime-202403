import "dotenv/config"
import logic from "../logic/index.js"
import { CredentialsError } from "com/errors.js"
import jwt from "../utils/jsonwebtoken-promised.js"

const { JWT_SECRET } = process.env

export default (req, res, next) => {
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
              next(error)
            })
        } catch (error) {
          next(error)
        }
      })
      .catch((error) => next(new CredentialsError(error.message)))

  } catch (error) {
    next(error)
  }
}
