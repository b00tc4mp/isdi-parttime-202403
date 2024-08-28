import isUserLoggedIn from './isUserLoggedIn'
import loginAdmin from './loginAdmin'
import logoutUser from './logoutUser'
import registerAdmin from './registerAdmin'
import registerUser from './registerUser'
import createTask from './createTask'
import getAllUsers from './getAllUsers'
import deleteTask from './deleteTask'
import getAllTasks from './getAllTasks'
import getUserRole from './getUserRole'
import getUsername from './getUsername'
import getDayWithTask from './getDayWithTask'
import getTasksForDate from './getTasksForDate'
import deleteProfile from './deleteProfile'
import toggleDoneTask from './toggleDoneTAsk'
import getUserId from './getUserId'
import updateAvatar from './updateAvatar'
import updateEmail from './updateEmail'
import updateUsername from './updateUsername'
import updateTaskDescription from './updateTaskDescription'
const logic = {
    isUserLoggedIn,
    loginAdmin,
    logoutUser,
    registerAdmin,
    registerUser,
    createTask,
    getAllUsers,
    deleteTask,
    getAllTasks,
    getUserRole,
    deleteProfile,
    getDayWithTask,
    getUsername,
    getTasksForDate,
    toggleDoneTask,
    getUserId,
    updateAvatar,
    updateEmail,
    updateUsername,
    updateTaskDescription

}

export default logic