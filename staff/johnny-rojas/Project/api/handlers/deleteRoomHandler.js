import 'dotenv/config'
import jwt from '../util/jwtoken-promised.js'
import logic from '../logic/index.js'

const { JWT_SECRET } = process.env

const deleteRoomHandler = ((req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then(payload => {
        const { sub: userId } = payload

        const { roomId } = req.params

        try {
          logic.deleteRoom(userId, roomId)
          .then(() => {res.status(204).send()})
          
        } catch (error) {
          next(error)
        }
      })

  } catch (error) {
    next(error)
  }
})


export default deleteRoomHandler