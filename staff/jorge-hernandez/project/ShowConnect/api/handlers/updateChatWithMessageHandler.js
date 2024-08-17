import updateChatWithMessage from '../logic/index.js'

export default async (req, res, next) => {
  const { chatId, messageId } = req.params

  if (!chatId || !messageId) {
    return res
      .status(400)
      .json({ message: 'Chat ID and Message ID are required.' })
  }

  try {
    logic
      .updateChatWithMessage(chatId, messageId)
      .then(() => {
        res.status(200).send()
      })
      .catch((error) => {
        next(error)
      })
  } catch (error) {
    next(error)
  }
}
