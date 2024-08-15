import updateChatWithMessage from '../logic/updateChatWithMessage.js'

export default async (req, res, next) => {
  const { chatId, messageId } = req.params

  if (!chatId || !messageId) {
    return res
      .status(400)
      .json({ message: 'Chat ID and Message ID are required.' })
  }

  try {
    await updateChatWithMessage(chatId, messageId)
    res.status(200).send()
  } catch (error) {
    next(error)
  }
}
