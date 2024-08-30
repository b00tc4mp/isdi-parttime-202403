import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'

import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { title, description, price } = req.body

                const { adId } = req.params

                try {
                    logic.updateAd(userId, adId, title, description, price)
                        // .then((updateAd) => {
                        .then(() => {
                            console.log('ad updated')

                            // res.status(200).send()

                            res.status(200).send({ title, description, price })

                            // res.status(200).json(updateAd)

                        })


                        .catch(error => next(error))

                } catch (error) {
                    next(error)
                }
            })
            .catch(error => next(new CredentialsError(error.message)))
    } catch (error) {
        next(error)
    }
}

