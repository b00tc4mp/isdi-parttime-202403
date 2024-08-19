import logic from '../logic/index.js'

export default (req, res, next) => {
  const { userId } = req.params
  const { artisticName, image, description, dates, video } = req.body

  const updateData = {}

  if (artisticName) updateData.artisticName = artisticName
  if (image) updateData.image = image
  if (description) updateData.description = description
  if (dates) updateData.dates = dates
  if (video) updateData.video = video

  try {
    logic
      .updateArtist(userId, updateData)
      .then((updatedUser) => {
        res.status(200).json(updatedUser)
      })
      .catch((error) => {
        next(error)
      })
  } catch (error) {
    next(error)
  }
}
