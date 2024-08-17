import logic from '../logic/index.js'
import * as next from 'next'

export default (req, res, next) => {
  //TODO VALIDATES

  try {
    logic
      .createMessage(userId, messageText, chatId)
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
