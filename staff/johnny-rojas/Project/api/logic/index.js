import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import editUserContact from './editUserContact.js'
import closeAccount from './closeAccount.js'

import createRoom from './createRoom.js'
import getAllRooms from './getAllRooms.js'
import getRoom from './getRoom.js'
import getAllUserRooms from './getAllUserRooms.js'
import editRoom from './editRoom.js'
import deleteRoom from './deleteRoom.js'

import createBooking from './createBooking.js'
import getAllBookings from './getAllBookings.js'
import getBlockedDatesByRoom from './getBlockedDatesByRoom.js'
import getRoomBookings from './getRoomBookings.js'
import getGuestInfo from './getGuestInfo.js'


const logic = {
  registerUser,
  authenticateUser,
  editUserContact,
  closeAccount,

  createRoom,
  getAllRooms,
  getRoom,
  getAllUserRooms,
  editRoom,
  deleteRoom,

  createBooking, 
  getAllBookings,
  getBlockedDatesByRoom,
  getRoomBookings,
  getGuestInfo
}

export default logic