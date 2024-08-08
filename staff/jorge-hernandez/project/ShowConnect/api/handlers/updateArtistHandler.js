import logic from '../logic/index.js'

export default (req, res, next) => {
  const { userId } = req.params
  const { artisticName, images } = req.body

  const updateData = {}

  if (artisticName) updateData.artisticName = artisticName
  if (images) updateData.images = images

  logic
    .updateArtist(userId, updateData)
    .then((updatedUser) => {
      res.status(200).json(updatedUser)
    })
    .catch((error) => {
      next(error)
    })
}
