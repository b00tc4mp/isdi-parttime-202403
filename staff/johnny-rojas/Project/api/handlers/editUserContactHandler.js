import 'dotenv/config'
import jwt from '../util/jwtoken-promised.js'
import logic from '../logic/index.js'
import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

const editUserContact = (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then(payload => {
        const { sub: userId } = payload

        const updates = req.body

        try {
          logic.editUserContact(userId, updates)
            .then(updatedUser => {
              res.status(200).json(updatedUser)
            })
            .catch(error => next(error))
        } catch (error) {
          next(error)
        }
      })
      .catch(error => next(new CredentialsError(error.message)))
  } catch (error) {
    next(error)
  }
}

export default editUserContact