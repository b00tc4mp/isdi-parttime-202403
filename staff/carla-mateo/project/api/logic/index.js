import registerUser from './registerUser.js'
import registerAdmin from './registerAdmin.js'
import authenticateAdmin from './authenticateAdmin.js'
import getUserName from './getUserName.js'
import createTask from './createTask.js'
import deleteTask from './deleteTask.js'
import getAllUsers from './getAllUsers.js'

const logic = {
    registerUser,
    registerAdmin,
    authenticateAdmin,
    getUserName,
    createTask,
    deleteTask,
    getAllUsers
}

export default logic