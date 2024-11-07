import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'

import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7)

    const payload = await jwt.verify(token, JWT_SECRET)

    const { sub: userId } = payload

    const userData = await logic.getArtistData(userId)

    res.json(userData)
  } catch (error) {
    if (error instanceof CredentialsError) {
      next(new CredentialsError(error.message))
    } else {
      next(error)
    }
  }
}
