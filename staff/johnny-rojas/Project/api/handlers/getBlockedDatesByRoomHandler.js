import { SystemError } from "com/errors.js";
import logic from '../logic/index.js'

const getBlockedDatesByRoomHandler = (req, res, next) => {
  try {
    const { roomId } = req.params

    try {
      logic.getBlockedDatesByRoom(roomId)
        .then(blockedDates => res.json(blockedDates))
        .catch(error => next(error))
    } catch (error) {
      next(new SystemError(error.message))
    }
  } catch (error) {
    next(error)
  }
}

export default getBlockedDatesByRoomHandler
