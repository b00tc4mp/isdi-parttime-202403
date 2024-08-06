import registerUserHandler from './registerUserHandler.js';
import authenticateUserHandler from './authenticaUserHandler.js';
import getUserNameHandler from '../handlers/getUserNameHandler.js';
import createRoomHandler from './createRoomHandler.js';
import getAllRoomsHandler from './getAllRoomsHandler.js';
import getRoomHandler from './getRoomHandler.js';


const handlers = {
  registerUserHandler,
  authenticateUserHandler,
  getUserNameHandler,

  createRoomHandler,
  getAllRoomsHandler,
  getRoomHandler,
}

export default handlers