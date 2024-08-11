import 'dotenv/config'
import jwt from '../util/jwtoken-promised.js'
import logic from '../logic/index.js'
import { CredentialsError } from 'com/errors.js'

const {JWT_SECRET} = process.env

const editRoomHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then(payload => {
        const { sub: userId } = payload

        const { roomId } = req.params

        const updates = req.body

        try {
          logic.editRoom(userId, roomId, updates)
            .then(updatedRoom => {
              res.status(200).json(updatedRoom)
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

export default editRoomHandler