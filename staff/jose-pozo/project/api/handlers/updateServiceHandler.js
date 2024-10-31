import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'

import { SystemError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {

    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { serviceId } = req.params

                const { serviceUpdated } = req.body

                try {
                    logic.updateService(userId, serviceId, serviceUpdated)
                        .then(() => res.status(200).send())
                        .catch(error => next(error))
                } catch (error) {
                    next(error)
                }
            })
            .catch(error => next(new SystemError(error.message)))
    } catch (error) {
        next(error)
    }
}