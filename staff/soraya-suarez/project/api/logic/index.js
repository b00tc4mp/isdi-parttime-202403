import enrollUser from './enrollUser.js'
import authenticateUser from './authenticateUser.js'
import addTask from './addTask.js'
import getMyTasks from './getMyTasks.js'
import getMyPrivateTasks from './getMyPrivateTasks.js'
import getMyInProgressTasks from './getMyInProgressTasks.js'
import deleteTask from './deleteTask.js'

const logic = {
    enrollUser,
    authenticateUser,
    addTask,
    getMyTasks,
    getMyPrivateTasks,
    getMyInProgressTasks,
    deleteTask
}

export default logic