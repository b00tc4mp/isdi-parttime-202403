import enrollUser from './enrollUser.js'
import authenticateUser from './authenticateUser.js'
import getMyProfile from './getMyProfile.js'
import getAllUsers from './getAllUsers.js'
import getAvailableUsers from './getAvailableUsers.js'
import modifyUser from './modifyUser.js'
import modifyName from './modifyName.js'
import modifySurname from './modifySurname.js'
import modifyEmail from './modifyEmail.js'
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
import releaseTask from './releaseTask.js'
import finishTask from './finishTask.js'
import deleteTask from './deleteTask.js'

const logic = {
    enrollUser,
    authenticateUser,
    getMyProfile,
    getAllUsers,
    getAvailableUsers,
    modifyUser,
    modifyName,
    modifySurname,
    modifyEmail,
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
    finishTask,
    releaseTask,
    deleteTask
}

export default logic