import logic from '../logic/index.js'

export default async (req, res, next) => {
  const { artistId, date } = req.params

  try {
    await logic.deleteDate(artistId, date)
    res.status(200).send()
  } catch (error) {
    if (error instanceof CredentialsError) {
      next(new CredentialsError(error.message))
    } else {
      next(error)
    }
  }
}
