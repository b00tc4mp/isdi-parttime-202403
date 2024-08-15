import logic from '../logic/index.js'

export default (req, res, next) => {
  const { name, email, messageText, password, passwordRepeat, artistId } =
    req.body

  try {
    logic
      .registerClient(
        name,
        email,
        messageText,
        password,
        passwordRepeat,
        artistId
      )
      .then((createdUser) => {
        res.status(201).send()
      })
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
}
