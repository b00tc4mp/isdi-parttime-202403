import registerUserHandler from './registerUserHandler.js';
import authenticateUserHandler from './authenticaUserHandler.js';
import getUserNameHandler from '../handlers/getUserNameHandler.js';
import editUserContact from './editUserContactHandler.js';
import closeAccountHandler from './closeAccountHandler.js';

import createRoomHandler from './createRoomHandler.js';
import getAllRoomsHandler from './getAllRoomsHandler.js';
import getRoomHandler from './getRoomHandler.js';
import getAllUserRoomsHandler from './getAllUserRoomsHandler.js';
import editRoomHandler from './editRoomHandler.js'
import deleteRoomHandler from './deleteRoomHandler.js'

import createBookingHandler from './createBookingHandler.js'
import getAllBookingsHandler from './getAllBookingsHandler.js';
import getBlockedDatesByRoomHandler from './getBlockedDatesByRoomHandler.js';



const handlers = {
  registerUserHandler,
  authenticateUserHandler,
  getUserNameHandler,
  editUserContact,
  closeAccountHandler,

  createRoomHandler,
  getAllRoomsHandler,
  getRoomHandler,
  getAllUserRoomsHandler,
  editRoomHandler,
  deleteRoomHandler,

  createBookingHandler,
  getAllBookingsHandler,
  getBlockedDatesByRoomHandler
}

export default handlers
