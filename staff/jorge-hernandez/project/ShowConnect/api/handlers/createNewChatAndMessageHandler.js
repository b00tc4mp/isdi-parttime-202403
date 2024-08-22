import logic from '../logic/index.js'
const { JWT_SECRET } = process.env
import jwt from '../util/jsonwebtoken-promised.js'

export default (req, res, next) => {
  const token = req.headers.authorization?.slice(7)

  jwt.verify(token, JWT_SECRET).then((payload) => {
    const { sub: userId } = payload

    const { artistId, messageText } = req.body

    try {
      logic
        .createNewChatAndMessage(userId, artistId, messageText)
        .then(() => res.status(200).send())
        .catch((error) => next(error))
    } catch (error) {
      next(error)
    }
  })
}
