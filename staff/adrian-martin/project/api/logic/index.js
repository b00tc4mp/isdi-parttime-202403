import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'
import editUsername from './editUsername.js'
import createGame from './createGame.js'
import getAllGames from './getAllGames.js'
import deleteGameHandler from '../handlers/deleteGameHandler.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    editUsername,
    createGame,
    getAllGames,
    deleteGameHandler
}

export default logic