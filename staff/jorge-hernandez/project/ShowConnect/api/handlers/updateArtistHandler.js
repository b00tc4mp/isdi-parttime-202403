import User from '../data/User.js'
const updateArtistHandler = (req, res) => {
  const { targetUserId } = req.params
  const { artisticName } = req.body

  User.findByIdAndUpdate(targetUserId, { artisticName }, { new: true })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ error: 'NotFoundError', message: 'Artist not found' })
      }
      res.json(user)
    })
    .catch((error) => {
      res.status(500).json({ error: 'SystemError', message: error.message })
    })
}

export default updateArtistHandler
