import registerUser from './registerUser.js'
import registerAdmin from './registerAdmin.js'
import authenticateAdmin from './authenticateAdmin.js'
import createTask from './createTask.js'
import deleteTask from './deleteTask.js'
import getAllUsers from './getAllUsers.js'
import getAllTasks from './getAllTasks.js'
import getUsername from './getUsername.js'
import updateDataUser from './updateDataUser.js'
import deleteUser from './deleteUser.js'
import taskDay from './taskDay.js'
import getTasksForDate from './getTasksForDate.js'

const logic = {
    registerUser,
    registerAdmin,
    authenticateAdmin,
    createTask,
    deleteTask,
    getAllUsers,
    getAllTasks,
    getUsername,
    updateDataUser,
    deleteUser,
    taskDay,
    getTasksForDate

}

export default logic