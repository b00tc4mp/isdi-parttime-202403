
import { Task } from "../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"

const getAllTasks = (parent) => {

    return Task.find({ parent }).lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(tasks => {
            if (!tasks) {
                throw new NotFoundError("Tasks not foun")
            }
            return tasks
        })
}
export default getAllTasks