import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'
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
import getAllBookingsByGuest from './getAllBookingsByGuest.js'
import deleteBookingByHost from './deleteBookingByHost.js'



const logic = {
  registerUser,
  authenticateUser,
  getUserName,
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
  getAllBookingsByGuest,
  deleteBookingByHost

}

export default logic