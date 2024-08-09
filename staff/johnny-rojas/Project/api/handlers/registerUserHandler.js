import logic from '../logic/index.js'

const registerUserHandler = (req, res, next) => {
  const { name, surname, email, phone, password, passwordRepeat } = req.body

  try {
    logic.registerUser (name, surname, email, phone, password, passwordRepeat)
      .then(() => res.status(201).send('created user'))
      .catch(error => {
        next(error)
      })

  } catch (error) {
    next(error)
  }
}

export default registerUserHandler