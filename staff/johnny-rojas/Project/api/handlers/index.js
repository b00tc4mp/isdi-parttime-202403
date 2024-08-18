import registerUserHandler from './registerUserHandler.js';
import authenticateUserHandler from './authenticaUserHandler.js';
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
import getRoomBookingsHandler from './getRoomBookinsHandler.js'
import getAllBookingsByGuestHandler from './getAllBookingsByGuestHandler.js';




const handlers = {
  registerUserHandler,
  authenticateUserHandler,
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
  getBlockedDatesByRoomHandler,
  getRoomBookingsHandler,
  getAllBookingsByGuestHandler

}

export default handlers
