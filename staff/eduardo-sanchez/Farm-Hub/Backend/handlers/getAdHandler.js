import jwt from '../util/jsonwebtoken-promised.js'

import { CredentialsError } from 'com/errors.js';


import logic from "../logic/index.js";

const { JWT_SECRET } = process.env

export default (req, res, next) => {

    try {

        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { adId } = req.params

                try {
                    logic.getAd(adId)
                        .then(ad => {
                            res.json(ad)
                            // res.status(200).send(user)
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

