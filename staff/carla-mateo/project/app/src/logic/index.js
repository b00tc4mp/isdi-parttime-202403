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
import updateDataUser from './updateDataUser'
import getUsername from './getUsername'
import taskDay from './taskDay'
import getTasksForDate from './getTasksForDate'
import deleteProfile from './deleteProfile'

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
    updateDataUser,
    deleteProfile,
    taskDay,
    getUsername,
    getTasksForDate

}

export default logic