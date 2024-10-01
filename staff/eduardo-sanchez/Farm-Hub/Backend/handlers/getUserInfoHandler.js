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

                try {
                    logic
                        .getUserInfo(userId)
                        .then((userInfo) => {
                            console.log(userInfo);
                            res.status(200).send(userInfo);
                        })
                        .catch((error) => {
                            if (error instanceof jwt.JsonWebTokenError) {
                                throw new CredentialsError(error.message);
                            } else {
                            }
                            next(error);
                        });
                } catch (error) {
                    next(error);
                }
            })

            .catch((error) => next(new CredentialsError(error.message)));
    } catch (error) {
        next(error);
    }
};
