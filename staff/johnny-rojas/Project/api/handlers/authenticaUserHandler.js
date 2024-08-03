import 'dotenv/config.js'
import logic from '../logic/index.js'
import jwt from '../util/jwtoken-promised.js'
import { SystemError } from 'com/errors.js'

const { JWT_SECRET } = process.env

const authenticateUserHandler = ((req, res, next) => {
  const { email, password } = req.body

  try {
    logic.authenticateUser(email, password)
      .then(userId =>
        jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '4d' })
          .then(token => res.json(token))
          .catch(error => next(new SystemError(error.message)))
      )
      .catch(error => next(error))
  } catch (error) {
    next(error)
  }
})

export default authenticateUserHandler