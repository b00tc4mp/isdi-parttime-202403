import { User, Ad } from '../data/index.js';
import { SystemError, NotFoundError } from 'com/errors.js';
import validate from 'com/validate.js';

const createAd = (
    userId,
    title,
    description,
    price,
    contactInfo,
    geoLocation
) => {
    validate.id(userId, 'userId');
    validate.text(title, 'title', 50);
    validate.text(description, 'description', 200);
    validate.price(price, 'price');
    validate.contactInfo(contactInfo, 'contactInfo');
    validate.geoLocation(geoLocation, 'geoLocation');

    return User.findById(userId)
        .lean()
        .catch((error) => {
            throw new SystemError(error.message);
        })
        .then((user) => {
            if (!user) throw new NotFoundError('user not found');

            const ad = {
                author: userId,
                title,
                description,
                price,
                date: new Date(),
                contactInfo,
                adcomments: [],
                geoLocation: {
                    lat: geoLocation.lat,
                    lng: geoLocation.lng,
                },
            };

            return Ad.create(ad)
                .catch((error) => {
                    throw new SystemError(error.message);
                })
                .then(() => {});
        });
};

export default createAd;
