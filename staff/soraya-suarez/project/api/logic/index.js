import enrollUser from './enrollUser.js'
import authenticateUser from './authenticateUser.js'
import getAllUsers from './getAllUsers.js'
import getAvailableUsers from './getAvailableUsers.js'
import modifyUser from './modifyUser.js'
import modifyUserAvailable from './modifyUserAvailable.js'
import deleteUser from './deleteUser.js'

import addTask from './addTask.js'
import getAvailableTasks from './getAvailableTasks.js'
import getMyTasks from './getMyTasks.js'
import getMyPrivateTasks from './getMyPrivateTasks.js'
import getMyInProgressTasks from './getMyInProgressTasks.js'
import getMyFinishedTasks from './getMyFinishedTasks.js'
import selectTask from './selectTask.js'
import modifyTaskAsOwner from './modifyTaskAsOwner.js'
import modifyTaskAsCreator from './modifyTaskAsCreator.js'
import deleteTask from './deleteTask.js'

const logic = {
    enrollUser,
    authenticateUser,
    getAllUsers,
    getAvailableUsers,
    modifyUser,
    modifyUserAvailable,
    deleteUser,
    
    addTask,
    getAvailableTasks,
    getMyTasks,
    getMyPrivateTasks,
    getMyInProgressTasks,
    getMyFinishedTasks,
    selectTask,
    modifyTaskAsOwner,
    modifyTaskAsCreator,
    deleteTask
}

export default logic