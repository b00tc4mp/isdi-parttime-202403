import validate from "com/validate.js"
import { User } from "../model/index.js"

function getTargetUser(userId, targetUserId) {
  validate.id(userId, "userId")
  validate.id(targetUserId, "targetUserId")

  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError("User not found")
      }

      return User.findById(targetUserId).select("-__v").lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(targetUser => {
          if (!targetUser) {
            throw new NotFoundError("targetUser not found")
          }
          targetUser.id = targetUser._id.toString()
          delete targetUser._id

          if (targetUser.manager) {
            targetUser.manager = targetUser.manager.toString()
          }
          return targetUser
        })
    })
}

export default getTargetUser