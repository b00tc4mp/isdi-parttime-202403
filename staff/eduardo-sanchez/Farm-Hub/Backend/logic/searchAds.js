import { Ad } from '../data/index.js';

import { SystemError, NotFoundError } from 'com/errors.js';

import validate from 'com/validate.js';

import { calculateDistance } from '../util/calculateDistance.js';

const searchAds = (searchText, userLocation, maxDistance = 50) => {
    const regexp = new RegExp(searchText, 'i');
    validate.text(searchText, 'searchText', 20);
    validate.geoLocation(userLocation, 'userLocation');
    validate.maxDistance(maxDistance, 'maxDistance');

    return Ad.find({ title: { $regex: regexp } })
        .populate('author', 'username')
        .select('-__v')
        .sort({ date: -1 })
        .lean()
        .catch((error) => {
            throw new SystemError(error.message);
        })
        .then((ads) => {
            if (!ads || !ads.length) throw new NotFoundError('ads not found');

            if (userLocation && userLocation.lat && userLocation.lng) {
                return ads.filter((ad) => {
                    if (
                        !ad.geoLocation ||
                        !ad.geoLocation.lat ||
                        !ad.geoLocation.lng
                    ) {
                        return false;
                    }
                    const distance = calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        ad.geoLocation.lat,
                        ad.geoLocation.lng
                    );
                    return distance <= maxDistance;
                });
            }

            return ads;
        });
};

export default searchAds;
