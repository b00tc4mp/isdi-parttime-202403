import logic from '../logic/index.js'
const { JWT_SECRET } = process.env
import jwt from '../util/jsonwebtoken-promised.js'

export default (req, res, next) => {
  const token = req.headers.authorization.slice('7')

  jwt.verify(token, JWT_SECRET).then((payload) => {
    const { sub: userId } = payload

    const { chatId, messageText } = req.body
    try {
      logic
        .createAndUpdateMessage(chatId, userId, messageText)

        .then(() => {
          res.status(200).send()
        })
        .catch((error) => next(error))
    } catch (error) {
      next(error)
    }
  })
}
