import logic from '../logic/index.js'
import { CredentialsError } from 'com/errors.js'
import jwt from '../util/jwtoken-promised.js'

const { JWT_SECRET } = process.env

const getUserNameHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then(payload => {
        const { sub: id, role } = payload

        const user = { id, role } 

        const { targetUserId } = req.params

        try {
          logic.getUserName(user, targetUserId)
            .then(name => res.json(name))
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

export default getUserNameHandler