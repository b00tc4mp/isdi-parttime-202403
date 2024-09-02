import logic from '../logic/index.js'

const deleteDateHandler = (req, res, next) => {
  const { artistId, date } = req.params

  try {
    logic
      .deleteDate(artistId, date)
      .then(() => res.status(200).send())
      .catch((error) => next(error))
  } catch (error) {
    next(error)
  }
}
export default deleteDateHandler
