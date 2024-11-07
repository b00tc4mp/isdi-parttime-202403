import logic from '../logic/index.js'

export default async (req, res, next) => {
  const { city, discipline, excludedDate } = req.params

  try {
    const artistsList = await logic.getArtistsByCity(
      city,
      discipline,
      excludedDate
    )
    res.json(artistsList)
  } catch (error) {
    next(error)
  }
}
