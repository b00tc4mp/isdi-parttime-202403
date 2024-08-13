import 'dotenv/config'
import jwt from '../util/jwtoken-promised.js'
import logic from '../logic/index.js'
import { DuplicityError } from 'com/errors.js'

const { JWT_SECRET } = process.env

const createBookingHandler = ((req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then(payload => {
        const { sub: userId } = payload

        const { roomId } = req.params

        const { startDate, endDate } = req.body

        try {
          logic.createBooking(userId, roomId, startDate, endDate)
            .then(() => { res.status(201).send() })
            .catch(error => next(error))
        } catch (error) {
          next(error)
        }
      })
      .catch(error => next(new DuplicityError(error.message)))

  } catch (error) {
    next(error)
  }
})


export default createBookingHandler