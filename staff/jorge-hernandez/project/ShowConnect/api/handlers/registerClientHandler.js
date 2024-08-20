import logic from '../logic/index.js'

export default (req, res, next) => {
  const { name, email, password, passwordRepeat } = req.body

  try {
    logic
      .registerClient(name, email, password, passwordRepeat)
      .then(() => {
        res.status(201).send()
      })
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
}
