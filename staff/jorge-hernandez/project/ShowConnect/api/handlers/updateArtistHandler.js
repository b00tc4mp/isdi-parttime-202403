import logic from '../logic/index.js'

export default (req, res, next) => {
  const { userId } = req.params
  const { artisticName, images, description, dates } = req.body

  const updateData = {}

  if (artisticName) updateData.artisticName = artisticName
  if (images) updateData.images = images
  if (description) updateData.description = description
  if (dates) updateData.dates = dates

  logic
    .updateArtist(userId, updateData)
    .then((updatedUser) => {
      res.status(200).json(updatedUser)
    })
    .catch((error) => {
      next(error)
    })
}
