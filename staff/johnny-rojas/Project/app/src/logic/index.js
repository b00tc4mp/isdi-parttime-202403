import registerUser from './registerUser';
import isUserLoggedIn from './isUserLoggedIn';
import loginUser from './loginUser'
import logoutUser from './logoutUser';
import { getUserId, getUserRole } from "./getUserInfo";
import closeAccount from './closeAccount';
import editUserContact from './editUserContact'

import createRoom from './createRoom';
import getAllRooms from './getAllRooms';
import getRoom from './getRoom'
import getAllUserRooms from './getAllUserRooms'
import editRoom from './editRoom';
import deleteRoom from './deleteRoom';

import createBooking from './createBooking'
import getBlockedDatesByRoom from './getBlockedDatesByRoom';
import getRoomBookings from './getRoomBookings'
import getGuestInfo from './getGuestInfo'
import getAllBookingsByGuest from './getAllBookingsByGuest'
import deleteBookingByHost from './deleteBookingByHost';

const logic = {
  registerUser,
  isUserLoggedIn,
  loginUser,
  logoutUser,
  getUserId,
  getUserRole,
  editUserContact,
  closeAccount,

  createRoom,
  getAllRooms,
  getRoom,
  getAllUserRooms,
  editRoom,
  deleteRoom,

  createBooking,
  getBlockedDatesByRoom,
  getRoomBookings,
  getGuestInfo,
  getAllBookingsByGuest,
  deleteBookingByHost
}

export default logic