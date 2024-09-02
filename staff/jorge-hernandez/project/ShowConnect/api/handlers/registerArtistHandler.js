import logic from '../logic/index.js'

export default (req, res, next) => {
  const {
    name,
    artisticName,
    discipline,
    city,
    description,
    email,
    image,
    video,
    password,
    passwordRepeat,
  } = req.body

  try {
    logic
      .registerArtist(
        name,
        artisticName,
        discipline,
        city,
        description,
        email,
        image,
        video,
        password,
        passwordRepeat
      )
      .then(() => res.status(201).send())
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
}
