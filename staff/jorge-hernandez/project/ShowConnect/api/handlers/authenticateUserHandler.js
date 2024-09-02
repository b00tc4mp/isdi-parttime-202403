import jwt from '../util/jsonwebtoken-promised.js'
import logic from '../logic/index.js'

const { JWT_SECRET } = process.env

export default async (req, res, next) => {
  const { email, password } = req.body

  try {
    const { userId, role } = await logic.authenticateUser(email, password)

    const token = await jwt.sign({ sub: userId, role }, JWT_SECRET, {
      expiresIn: '365d',
    })

    res.json({ token, role })
  } catch (error) {
    next(error)
  }
}
