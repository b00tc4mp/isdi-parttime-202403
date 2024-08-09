import registerUser from './registerUser';
import isUserLoggedIn from './isUserLoggedIn';
import loginUser from './loginUser'
import logoutUser from './logoutUser';

import createRoom from './createRoom';
import getAllRooms from './getAllRooms';
import getRoom from './getRoom'
import getAllUserRooms from './getAllUserRooms'

const logic = {
  registerUser,
  isUserLoggedIn,
  loginUser,
  logoutUser,

  createRoom,
  getAllRooms,
  getRoom,
  getAllUserRooms,
}

export default logic