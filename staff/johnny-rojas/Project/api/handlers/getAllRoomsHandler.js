import 'dotenv/config'
import logic from '../logic/index.js'
import { SystemError } from 'com/errors.js'

const getAllRoomsHandler = (req, res, next) => {
  logic.getAllRooms()
    .then(rooms => {
      res.status(200).json(rooms); 
    })
    .catch(error => {
      next(new SystemError(error.message)); 
    });
};

export default getAllRoomsHandler