import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserId from './getUserId.js'

import createRoom from './createRoom.js'
import getAllRooms from './getAllRooms.js'
import getRoom from './getRoom.js'
import getAllUserRooms from './getAllUserRooms.js'


const logic = {
  registerUser,
  authenticateUser,
  getUserId,

  createRoom,
  getAllRooms,
  getRoom,
  getAllUserRooms,
}

export default logic