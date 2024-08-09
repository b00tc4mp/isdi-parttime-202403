import { CredentialsError } from 'com/errors.js'
import logic from '../logic/index.js'
import jwt from '../util/jwtoken-promised.js'

const { JWT_SECRET } = process.env

const getRoomHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then(payload => {
        const { sub: userId } = payload

        const { roomId } = req.params

        try {
          logic.getRoom(userId, roomId)
            .then(room => res.json(room))
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

export default getRoomHandler