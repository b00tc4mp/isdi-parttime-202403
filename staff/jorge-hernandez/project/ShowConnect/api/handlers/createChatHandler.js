import logic from '../logic/index.js'

export default (req, res, next) => {
  const { users, messages } = req.body

  try {
    logic
      .createChat(users, messages)
      .then(() => res.status(201).send())
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
}
