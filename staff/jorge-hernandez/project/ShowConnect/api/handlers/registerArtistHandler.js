import logic from '../logic/index.js'

export default async (req, res, next) => {
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
    await logic.registerArtist(
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
    res.status(201).send()
  } catch (error) {
    next(error)
  }
}
