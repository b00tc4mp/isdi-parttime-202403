import registerUser from './registerUser.js'
import registerAdmin from './registerAdmin.js'
import authenticateAdmin from './authenticateAdmin.js'
import createTask from './createTask.js'
import deleteTask from './deleteTask.js'
import getAllUsers from './getAllUsers.js'
import getAllTasks from './getAllTasks.js'
import getUsername from './getUserame.js'
import editProfile from './editProfile.js'
import deleteProfile from './deleteProfile.js'


const logic = {
    registerUser,
    registerAdmin,
    authenticateAdmin,
    createTask,
    deleteTask,
    getAllUsers,
    getAllTasks,
    getUsername,
    editProfile,
    deleteProfile

}

export default logic