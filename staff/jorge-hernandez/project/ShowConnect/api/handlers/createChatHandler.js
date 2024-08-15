import createChat from '../logic/createChat.js'

export default async (req, res, next) => {
  const { userId, artistId } = req.body

  if (!userId || !artistId) {
    return res
      .status(400)
      .json({ message: 'User ID and Artist ID are required.' })
  }

  try {
    const chat = await createChat(userId, artistId)
    res.status(201).send()
  } catch (error) {
    next(error)
  }
}
