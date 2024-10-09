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

                const { searchText } = req.params;

                const { lat, lng, maxDistance = 50 } = req.query;

                const userLocation =
                    lat && lng
                        ? {
                              lat: parseFloat(lat),
                              lng: parseFloat(lng),
                          }
                        : null;

                const maxDistanceNumber = parseInt(maxDistance);

                try {
                    logic
                        .searchAds(searchText, userLocation, maxDistanceNumber)
                        .then((ads) => res.json(ads))
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
