import logic from '../logic/index.js'

export default (req, res, next) => {
  const { city, discipline, excludedDate } = req.params

  try {
    logic
      .getArtistsByCity(city, discipline, excludedDate)
      .then((artistsList) => {
        res.json(artistsList)
      })
      .catch((error) => {
        next(error)
      })
  } catch (error) {
    next(error)
  }
}
