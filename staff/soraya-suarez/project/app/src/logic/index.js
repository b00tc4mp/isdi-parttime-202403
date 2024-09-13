import enrollUser from './enrollUser'
import login from './login'
import isUserLoggedIn from './isUserLoggedIn'
import logout from './logout'
import getUserId from './getUserId'
import getMyName from './getMyName'
import getMyProfile from './getMyProfile'
import getUserRole from './getUserRole'
import getAllUsers from './getAllUsers'
import getAvalableUsers from './getAvailableUsers'
import modifyUser from './modifyUser'
import modifyMyName from './modifyMyName'
import modifyMySurname from './modifyMySurname'
import modifyMyEmail from './modifyMyEmail'
import modifyMyPhone from './modifyMyPhone'
import modifyMyAvatar from './modifyMyAvatar'
import modifyMyPassword from './modifyMyPassword'
import modifyUserAvailable from './modifyUserAvailable'
import deleteUser from './deleteUser'


import addTask from './addTask'
import getAvailableTasks from './getAvailableTasks'
import getMyTasks from './getMyTasks'
import getMyPrivateTasks from './getMyPrivateTasks'
import getMyInProgressTasks from './getMyInProgressTasks'
import getMyFinishedTasks from './getMyFinishedTasks'
import modifyTaskAsCreator from './modifyTaskAsCreator'
import modifyTaskAsOwner from './modifyTaskAsOwner'
import modifyTaskName from './modifyTaskName'
import modifyTaskDescription from './modifyTaskDescription'
import modifyTaskPriority from './modifyTaskPriority'
import modifyTaskStatus from './modifyTaskStatus'
import modifyTaskObservations from './modifyTaskObservations'
import modifyTaskVisible from './modifyTaskVisible'
import selectTask from './selectTask'
import releaseTask from './releaseTask'
import finishTask from './finishTask'
import deleteTask from './deleteTask'

const logic = {
    enrollUser,
    login,
    isUserLoggedIn,
    logout,
    getUserId,
    getMyName,
    getMyProfile,
    getUserRole,
    getAllUsers,
    getAvalableUsers,
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
    getMyInProgressTasks,
    getMyPrivateTasks,
    getMyFinishedTasks,
    modifyTaskAsCreator,
    modifyTaskAsOwner,
    modifyTaskName,
    modifyTaskDescription,
    modifyTaskPriority,
    modifyTaskStatus,
    modifyTaskObservations,
    modifyTaskVisible,
    selectTask,
    releaseTask,
    finishTask,
    deleteTask
}

export default logic