import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserId from './getUserId.js'

import createRoom from './createRoom.js'
import getAllRooms from './getAllRooms.js'
import getRoom from './getRoom.js'
import getAllUserRooms from './getAllUserRooms.js'
import editRoom from './editRoom.js'
import deleteRoom from './deleteRoom.js'

import createBooking from './createBooking.js'


const logic = {
  registerUser,
  authenticateUser,
  getUserId,

  createRoom,
  getAllRooms,
  getRoom,
  getAllUserRooms,
  editRoom,
  deleteRoom,
  createBooking
}

export default logic