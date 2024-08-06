import 'dotenv/config'
import jwt from '../util/jwtoken-promised.js'
import logic from '../logic/index.js'
import { CredentialsError } from "com/errors.js"

const { JWT_SECRET } = process.env

const createRoomHandler = ((req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then(payload => {
        const { sub: userId } = payload

        const { nameRoom, region, city, image, description, price, availability, likes, coordinates } = req.body

        try {
          logic.createRoom(userId, nameRoom, region, city, image, description, price, availability, likes, coordinates)
            .then((room) => { res.status(201).send(room) })
            .catch(error => next(error))
        } catch (error) {
          next(error)
        }
      })
      .catch(error => next(new CredentialsError(error.message)))
  } catch (error) {
    next(error)
  }
})

export default createRoomHandler