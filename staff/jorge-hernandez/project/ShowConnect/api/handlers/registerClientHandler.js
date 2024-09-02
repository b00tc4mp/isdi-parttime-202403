import logic from '../logic/index.js'

export default async (req, res, next) => {
  const { name, email, password, passwordRepeat } = req.body

  try {
    await logic.registerClient(name, email, password, passwordRepeat)
    res.status(201).send()
  } catch (error) {
    next(error)
  }
}
