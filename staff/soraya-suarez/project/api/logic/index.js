import enrollUser from './enrollUser.js'
import authenticateUser from './authenticateUser.js'
import getMyProfile from './getMyProfile.js'
import getAllUsers from './getAllUsers.js'
import getAvailableUsers from './getAvailableUsers.js'
import modifyUser from './modifyUser.js'
import modifyMyName from './modifyMyName.js'
import modifyMySurname from './modifyMySurname.js'
import modifyMyEmail from './modifyMyEmail.js'
import modifyMyPhone from './modifyMyPhone.js'
import modifyMyAvatar from './modifyMyAvatar.js'
import modifyMyPassword from './modifyMyPassword.js'
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
import modifyTaskName from './modifyTaskName.js'
import modifyTaskDescription from './modifyTaskDescription.js'
import modifyTaskPriority from './modifyTaskPriority.js'
import modifyTaskStatus from './modifyTaskStatus.js'
import modifyTaskObservations from './modifyTaskObservations.js'
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
    modifyMyName,
    modifyMySurname,
    modifyMyEmail,
    modifyMyPhone,
    modifyMyAvatar,
    modifyMyPassword,
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
    modifyTaskName,
    modifyTaskDescription,
    modifyTaskPriority,
    modifyTaskStatus,
    modifyTaskObservations,
    finishTask,
    releaseTask,
    deleteTask
}

export default logic