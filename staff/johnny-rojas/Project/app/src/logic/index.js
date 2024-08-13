import registerUser from './registerUser';
import isUserLoggedIn from './isUserLoggedIn';
import loginUser from './loginUser'
import logoutUser from './logoutUser';
import { getUserId, getUserRole } from "./getUserInfo";

import createRoom from './createRoom';
import getAllRooms from './getAllRooms';
import getRoom from './getRoom'
import getAllUserRooms from './getAllUserRooms'
import editRoom from './editRoom';
import deleteRoom from './deleteRoom';

import createBooking from './createBooking'

const logic = {
  registerUser,
  isUserLoggedIn,
  loginUser,
  logoutUser,
  getUserId,
  getUserRole,

  createRoom,
  getAllRooms,
  getRoom,
  getAllUserRooms,
  editRoom,
  deleteRoom,

  createBooking,
}

export default logic