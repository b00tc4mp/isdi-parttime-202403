import registerUser from './registerUser.js'
import registerAdmin from './registerAdmin.js'
import authenticateAdmin from './authenticateAdmin.js'
import createTask from './createTask.js'
import deleteTask from './deleteTask.js'
import getAllUsers from './getAllUsers.js'
import getAllTasks from './getAllTasks.js'
import getUsername from './getUsername.js'
import getTasksForDate from './getTasksForDate.js'
import deleteProfile from './deleteProfile.js'
import toggleDoneTask from './toggleDoneTask.js'
import updateUsername from './updateUsername.js'
import updateAvatar from './updateAvatar.js'
import updateEmail from './updateEmail.js'
import updateTaskDescription from './updateTaskDescription.js'
import getDayWithTask from './getDayWithTask.js'



const logic = {
    registerUser,
    registerAdmin,
    authenticateAdmin,
    createTask,
    deleteTask,
    getAllUsers,
    getAllTasks,
    getUsername,
    deleteProfile,
    getTasksForDate,
    toggleDoneTask,
    updateUsername,
    updateAvatar,
    updateEmail,
    updateTaskDescription,
    getDayWithTask

}

export default logic