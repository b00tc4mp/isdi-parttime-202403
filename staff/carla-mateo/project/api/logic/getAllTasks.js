
import { Task } from "../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"

const getAllTasks = (parent) => {

    return Task.find({ parent }).populate("assign").lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(tasks => {
            if (!tasks) {
                throw new NotFoundError("Tasks not foun")
            }
            tasks.forEach(task => {
                task.id = task._id.toString()
                delete task._id
            })
            return tasks
        })
}
export default getAllTasks