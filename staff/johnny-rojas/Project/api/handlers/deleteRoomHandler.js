import 'dotenv/config'
import jwt from '../util/jwtoken-promised.js'
import logic from '../logic/index.js'
import { MatchError, NotFoundError } from 'com/errors.js'

const { JWT_SECRET } = process.env

const deleteRoomHandler = (req, res, next) => {
  const token = req.headers.authorization?.slice(7)

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' })
  }

  jwt.verify(token, JWT_SECRET)
    .then(payload => {
      const { sub: userId } = payload
      const { roomId } = req.params

      return logic.deleteRoom(userId, roomId)
    })
    .then(() => {
      res.status(204).send()
    })
    .catch(error => {
      if (error instanceof MatchError) {
        res.status(400).json({ message: 'you cannot delete a room with bookings' })
      } else if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message })
      } else if (error.name === 'JsonWebTokenError') {
        res.status(401).json({ message: 'Invalid token' })
      } else {
        next(error)
      }
    })
}

export default deleteRoomHandler

//TODO Error is not defined