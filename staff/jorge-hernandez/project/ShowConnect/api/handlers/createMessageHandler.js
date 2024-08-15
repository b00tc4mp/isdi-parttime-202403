import createMessage from '../logic/createMessage.js'

export default async (req, res, next) => {
  const { userId, messageText, chatId } = req.body

  if (!userId || !messageText || !chatId) {
    return res
      .status(400)
      .json({ message: 'User ID, message text, and chat ID are required.' })
  }

  try {
    const message = await createMessage(userId, messageText, chatId)
    res.status(201).send()
  } catch (error) {
    next(error)
  }
}
