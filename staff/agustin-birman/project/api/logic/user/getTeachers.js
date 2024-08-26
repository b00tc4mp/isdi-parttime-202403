import validate from "com/validate.js";
import { User } from "../../data/index.js";
import { NotFoundError, SystemError } from "com/errors.js";

const getTeachers = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return User.find({ student: userId }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(teachers => {

                    const transformedTeachers = teachers.map(teacher => {
                        return {
                            id: teacher._id,
                            username: teacher.username,
                            name: teacher.name,
                            surname: teacher.surname
                        }
                    })

                    return transformedTeachers
                })
        })
}
export default getTeachers
