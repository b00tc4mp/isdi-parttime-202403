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

                const { adId } = req.params;

                try {
                    logic
                        .deleteAd(userId, adId)
                        .then(() => {
                            console.log('deleted ad', adId);
                            res.status(204).send();
                        })
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
