import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'
import editUsername from './editUsername.js'
import createGame from './createGame.js'
import getAllGames from './getAllGames.js'
import deleteGame from './deleteGame.js'
import editGame from './editGame.js'
import getAllGamesUser from './getAllGamesUser.js'
import getAllUsers from './getAllUsers.js'
import getTargetProfile from './getTargetProfile.js'
import getAllGamesTargetUser from './getAllGamesTargetUser.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    editUsername,
    createGame,
    getAllGames,
    editGame,
    deleteGame,
    getAllGamesUser,
    getAllUsers,
    getTargetProfile,
    getAllGamesTargetUser,
}

export default logic