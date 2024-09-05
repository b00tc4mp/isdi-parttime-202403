import enrollUserHandler from './enrollUserHandler.js'
import authenticateUserHandler from './authenticateUserHandler.js'
import getMyProfileHandler from './getMyProfileHandler.js'
import getAllUsersHandler from './getAllUsersHandler.js'
import getAvailableUsersHandler from './getAvailableUsersHandler.js'
import modifyUserHandler from './modifyUserHandler.js'
import modifyMyNameHandler from './modifyMyNameHandler.js'
import modifyMySurnameHandler from './modifyMySurnameHandler.js'
import modifyMyEmailHandler from './modifyMyEmailHandler.js'
import modifyMyphoneHandler from './modifyMyphoneHandler.js'
import modifyMyAvatarHandler from './modifyMyAvatarHandler.js'
import modifyUserAvailableHandler from './modifyUserAvailableHandler.js'
import deleteUserHandler from './deleteUserHandler.js'

import addTaskHandler from './addTaskHandler.js'
import getAvailableTasksHandler from './getAvailableTasksHandler.js'
import getMyTasksHandler from './getMyTasksHandler.js'
import getMyPrivateTasksHandler from './getMyPrivateTasksHandler.js'
import getMyInProgressTasksHandler from './getMyInProgressTasksHandler.js'
import getMyFinishedTasksHandler from './getMyFinishedTasksHandler.js'
import selectTaskHandler from './selectTaskHandler.js'
import modifyTaskAsOwnerHandler from './modifyTaskAsOwnerHandler.js'
import modifyTaskAsCreatorHandler from './modifyTaskAsCreatorHandler.js'
import finishTaskHandler from './finishTaskHandler.js'
import releaseTaskHandler from './releaseTaskHandler.js'
import deleteTaskHandler from './deleteTaskHandler.js'


import errorHandler from './errorHandler.js'

export {
    enrollUserHandler,
    authenticateUserHandler,
    getMyProfileHandler,
    getAllUsersHandler,
    getAvailableUsersHandler,
    modifyUserHandler,
    modifyMyNameHandler,
    modifyMySurnameHandler,
    modifyMyEmailHandler,
    modifyMyphoneHandler,
    modifyMyAvatarHandler,
    modifyUserAvailableHandler,
    deleteUserHandler,
    
    addTaskHandler,
    getAvailableTasksHandler,
    getMyTasksHandler,
    getMyPrivateTasksHandler,
    getMyInProgressTasksHandler,
    getMyFinishedTasksHandler,
    selectTaskHandler,
    modifyTaskAsOwnerHandler,
    modifyTaskAsCreatorHandler,
    finishTaskHandler,
    releaseTaskHandler,
    deleteTaskHandler,
    errorHandler
}