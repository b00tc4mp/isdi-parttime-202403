import enrollUser from './enrollUser'
import login from './login'
import isUserLoggedIn from './isUserLoggedIn'
import getUserId from './getUserId'
import getAllUsers from './getAllUsers'
import logout from './logout'

import addTask from './addTask'
import getAvailableTasks from './getAvailableTasks'
import getMyTasks from './getMyTasks'
import getMyPrivateTasks from './getMyPrivateTasks'
import getMyInProgressTasks from './getMyInProgressTasks'
import getMyFinishedTasks from './getMyFinishedTasks'
import deleteTask from './deleteTask'

const logic = {
    enrollUser,
    login,
    isUserLoggedIn,
    getUserId,
    getAllUsers,
    logout,

    addTask,
    getAvailableTasks,
    getMyTasks,
    getMyInProgressTasks,
    getMyPrivateTasks,
    getMyFinishedTasks,
    deleteTask
}

export default logic