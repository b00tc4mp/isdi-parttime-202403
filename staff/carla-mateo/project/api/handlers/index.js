import errorHandler from './errorHandler.js'

import registerUserHandler from './registerUserHandler.js'
import registerAdminHandler from './registerAdminHandler.js'
import authenticateAdminHandler from './authenticateAdminHandler.js'
import createTaskHandler from './createTaskHandler.js'
import deleteTaskHandler from './deleteTaskHandler.js'
import getAllUsersHandler from './getAllUsersHandler.js'
import getAllTasksHandler from './getAllTasks.Handler.js'
import getUsernameHandler from './getUsernameHandler.js'
import getTasksForDateHandler from './getTasksForDateHandler.js'
import deleteProfileHandler from './deleteProfileHandler.js'
import toggleDoneTaskHandler from './toggleDoneTaskHandler.js'
import updateEmailHandler from './updateEmailHandler.js'
import updateAvatarHandler from './updateAvatarHandler.js'
import updateUsernameHandler from './updateUsernameHandler.js'
import updateTaskDescriptionHandler from './updateTaskDescriptionHandler.js'
import getDayWithTaskHandler from './getDayWithTaskHandler.js'



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
    getTasksForDateHandler,
    toggleDoneTaskHandler,
    updateEmailHandler,
    updateAvatarHandler,
    updateUsernameHandler,
    updateTaskDescriptionHandler,
    getDayWithTaskHandler
}