import 'dotenv/config'
import jwt from '../util/jwtoken-promised.js'
import logic from '../logic/index.js'
import { CredentialsError, NotFoundError } from "com/errors.js"
import { User } from '../data/index.js'

const { JWT_SECRET } = process.env

const createRoomHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization?.slice(7)

    if (!token) {
      throw new CredentialsError('Authorization token is missing')
    }

    jwt.verify(token, JWT_SECRET)
      .then(payload => {
        const { sub: userId } = payload

        const { nameRoom, region, image, description, price, availability, likes, coordinates } = req.body

        if (!nameRoom || !region || !image || !description || !price || !availability || !coordinates) {
          throw new Error('Missing required fields in request body');
        }
            try {
              logic.createRoom(userId, nameRoom, region, image, description, price, availability, likes, coordinates)
                .then(() => res.status(201).send({ message: 'createRoom done' }))
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

export default createRoomHandler