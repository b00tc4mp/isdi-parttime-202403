import jwt from '../util/jsonwebtoken-promised.js';

import logic from '../logic/index.js';

import { CredentialsError } from 'com/errors.js';

const { JWT_SECRET } = process.env;

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7);

        jwt.verify(token, JWT_SECRET)
            .then((payload) => {
                const { sub: userId } = payload;

                const { title, description, price, contactInfo, geoLocation } =
                    req.body;

                try {
                    logic
                        .createAd(
                            userId,
                            title,
                            description,
                            price,
                            contactInfo,
                            geoLocation
                        )
                        .then(() =>
                            res.status(201).send({
                                title,
                                description,
                                price,
                                contactInfo,
                                geoLocation,
                            })
                        )

                        .catch((error) => next(error));
                } catch (error) {
                    next(error);
                }
            })
            .catch((error) => next(new CredentialsError(error.message)));
    } catch (error) {
        next(error);
    }
};
