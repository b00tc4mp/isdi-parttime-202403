import 'dotenv/config'
import logic from '../logic/index.js'
import { CredentialsError} from 'com/errors.js'
import jwt from '../util/jwtoken-promised.js'

const { JWT_SECRET } = process.env

const getGuestInfoHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt.verify(token, JWT_SECRET)
      .then(payload => {
        const { sub: userId } = payload

        const { bookingId } = req.params

        try {
          logic.getGuestInfo(bookingId, userId)
            .then(guestInfo = res.json(guestInfo))
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

export default getGuestInfoHandler