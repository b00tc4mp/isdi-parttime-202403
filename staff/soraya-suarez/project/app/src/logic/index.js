import enrollUser from './enrollUser'
import login from './login'
import isUserLoggedIn from './isUserLoggedIn'
import logout from './logout'
import getUserId from './getUserId'
import getMyProfile from './getMyProfile'
import getUserRole from './getUserRole'
import getAllUsers from './getAllUsers'
import getAvalableUsers from './getAvailableUsers'
import modifyUser from './modifyUser'
import modifyName from './modifyName'
import modifySurname from './modifySurname'
import modifyEmail from './modifyEmail'
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
    getMyProfile,
    getUserRole,
    getAllUsers,
    getAvalableUsers,
    modifyUser,
    modifyName,
    modifySurname,
    modifyEmail,
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
    selectTask,
    releaseTask,
    finishTask,
    deleteTask
}

export default logic