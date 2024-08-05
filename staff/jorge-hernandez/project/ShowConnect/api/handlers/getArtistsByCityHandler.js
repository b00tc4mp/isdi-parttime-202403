import logic from '../logic/index.js'

export default (req, res, next) => {
  const { city, discipline } = req.params

  logic
    .getArtistsByCity(city, discipline)
    .then((artistsList) => {
      res.json(artistsList)
    })
    .catch((error) => {
      next(error)
    })
}
