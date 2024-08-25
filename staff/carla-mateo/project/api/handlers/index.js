import errorHandler from './errorHandler.js'

import registerUserHandler from './registerUserHandler.js'
import registerAdminHandler from './registerAdminHandler.js'
import authenticateAdminHandler from './authenticateAdminHandler.js'
import createTaskHandler from './createTaskHandler.js'
import deleteTaskHandler from './deleteTaskHandler.js'
import getAllUsersHandler from './getAllUsersHandler.js'
import getAllTasksHandler from './getAllTasks.Handler.js'
import getUsernameHandler from './getUsernameHandler.js'
import updateDataUserHandler from './updateDataUserHandler.js'
import taskDayHandler from './taskDayHandler.js'
import getTasksForDateHandler from './getTasksForDateHandler.js'
import deleteProfileHandler from './deleteProfileHandler.js'
import toggleDoneTaskHandler from './toggleDoneTaskHandler.js'



export default {
    errorHandler,

    registerUserHandler,
    registerAdminHandler,
    authenticateAdminHandler,
    createTaskHandler,
    deleteTaskHandler,
    getAllUsersHandler,
    getAllTasksHandler,
    getUsernameHandler,
    deleteProfileHandler,
    updateDataUserHandler,
    taskDayHandler,
    getTasksForDateHandler,
    toggleDoneTaskHandler
}