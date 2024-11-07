import logic from '../logic/index.js'
import jwt from '../util/jsonwebtoken-promised.js'
import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    const payload = await jwt.verify(token, JWT_SECRET)
    const { sub: userId } = payload

    const { artistId, messageText } = req.body

    await logic.createNewChatAndMessage(userId, artistId, messageText)
    res.status(200).send()
  } catch (error) {
    if (error instanceof CredentialsError) {
      next(new CredentialsError(error.message))
    } else {
      next(error)
    }
  }
}
