import { User, Ad } from '../data/index.js';
import { MatchError, NotFoundError, SystemError } from 'com/errors.js';
import validate from 'com/validate.js';

const updateAd = (userId, adId, title, description, price, contactInfo) => {
    validate.id(userId, 'userId');
    validate.id(adId, 'adId');
    validate.text(title, 'title', 50);
    validate.text(description, 'description', 200);
    validate.price(price, 'price');
    validate.contactInfo(contactInfo, 'contactInfo');

    return User.findById(userId)
        .lean()
        .catch((error) => {
            throw new SystemError(error.message);
        })
        .then((user) => {
            if (!user) {
                throw new NotFoundError('User not found');
            }

            return Ad.findById(adId)
                .lean()
                .catch((error) => {
                    throw new SystemError(error.message);
                })
                .then((ad) => {
                    if (!ad) {
                        throw new NotFoundError(' Ad not found');
                    }
                    if (ad.author.toString() !== userId) {
                        throw new MatchError(
                            'You did not create this ad, so you cannot update it'
                        );
                    }

                    return (
                        Ad.findByIdAndUpdate(
                            adId,
                            { title, description, price, contactInfo },
                            { new: true }
                        )
                            .lean()
                            .catch((error) => {
                                throw new SystemError(error.message);
                            })
                            // .then((updateAd) => updateAd)
                            // .then(() => { })
                            .then((updateAd) => {
                                updateAd;
                            })
                    );
                });
        });
};

export default updateAd;
