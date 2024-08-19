import { User, Task } from "../data/index.js"
import { NotFoundError, SystemError } from "com/errors.js"
import Validate from "com/validate.js"

const getAllTasks = (userId) => {
    Validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError("user not found")
            }
            const { family } = user

            return Task.find({ family }).populate("assignee").lean()
                .catch((error) => { throw new SystemError(error.message) })
                .then(tasks => {

                    tasks.forEach((task) => {
                        task.id = task._id.toString()
                        task.assignee = task.assignee || null
                        delete task._id

                    })
                    return tasks
                })
        })
}

export default getAllTasks