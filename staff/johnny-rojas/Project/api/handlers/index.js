import registerUserHandler from './registerUserHandler.js';
import authenticateUserHandler from './authenticaUserHandler.js';
import getUserNameHandler from '../handlers/getUserNameHandler.js';
import createRoomHandler from './createRoomHandler.js';


const handlers = {
  registerUserHandler,
  authenticateUserHandler,
  getUserNameHandler,

  createRoomHandler,
}

export default handlers