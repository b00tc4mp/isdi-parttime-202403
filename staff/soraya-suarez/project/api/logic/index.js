import enrollUser from './enrollUser.js'
import authenticateUser from './authenticateUser.js'
import getAllUsers from './getAllUsers.js'

import addTask from './addTask.js'
import getAvailableTasks from './getAvailableTasks.js'
import getMyTasks from './getMyTasks.js'
import getMyPrivateTasks from './getMyPrivateTasks.js'
import getMyInProgressTasks from './getMyInProgressTasks.js'
import getMyFinishedTasks from './getMyFinishedTasks.js'
import deleteTask from './deleteTask.js'

const logic = {
    enrollUser,
    authenticateUser,
    getAllUsers,
    
    addTask,
    getAvailableTasks,
    getMyTasks,
    getMyPrivateTasks,
    getMyInProgressTasks,
    getMyFinishedTasks,
    deleteTask
}

export default logic