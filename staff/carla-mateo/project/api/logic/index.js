import registerUser from './registerUser.js'
import registerAdmin from './registerAdmin.js'
import authenticateAdmin from './authenticateAdmin.js'
import createTask from './createTask.js'
import deleteTask from './deleteTask.js'
import getAllUsers from './getAllUsers.js'
import getAllTasks from './getAllTasks.js'
import getUsername from './getUsername.js'
import taskDay from './taskDay.js'
import getTasksForDate from './getTasksForDate.js'
import deleteProfile from './deleteProfile.js'
import toggleDoneTask from './toggleDoneTask.js'
import updateUsername from './updateUsername.js'
import updateAvatar from './updateAvatar.js'
import updateEmail from './updateEmail.js'



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
    taskDay,
    getTasksForDate,
    toggleDoneTask,
    updateUsername,
    updateAvatar,
    updateEmail

}

export default logic