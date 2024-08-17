import createChat from '../logic/createChat.js'

export default async (req, res, next) => {
  const { userId, artistId } = req.body
  //TODO validates
  if (!userId || !artistId) {
    return res
      .status(400)
      .json({ message: 'User ID and Artist ID are required.' })
  }
  try {
    createMessage(userId, messageText, chatId)
      .then(() => {
        res.status(201).send()
      })
      .catch((error) => {
        next(error)
      })
  } catch (error) {
    next(error)
  }
}
