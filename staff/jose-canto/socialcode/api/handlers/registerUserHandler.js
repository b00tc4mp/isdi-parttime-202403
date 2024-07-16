import logic from "../logic/index.js"

export default ((req, res, next) => {
  try {
    const { name, surname, email, username, password, passwordRepeat } = req.body

    logic.registerUser(name, surname, email, username, password, passwordRepeat)
      .then(() => res.status(201).send())
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
})

