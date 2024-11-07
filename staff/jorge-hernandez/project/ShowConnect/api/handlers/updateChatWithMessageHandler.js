import logic from '../logic/index.js'
const { JWT_SECRET } = process.env
import jwt from '../util/jsonwebtoken-promised.js'

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    const payload = await jwt.verify(token, JWT_SECRET)
    const { sub: userId } = payload

    const { chatId, messageText } = req.body

    await logic.createAndUpdateMessage(chatId, userId, messageText)

    res.status(200).send()
  } catch (error) {
    if (error instanceof CredentialsError) {
      next(new CredentialsError(error.message))
    } else {
      next(error)
    }
  }
}
