import { User } from '../data/index.js'
import { Service } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'


const getAllServices = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Service.find({ provider: user._id, active: true }).select('-__v').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(services => {

                    services.forEach(service => {

                        service.id = service._id.toString()

                        delete service._id
                    })

                    return services
                })
        })
}


export default getAllServices