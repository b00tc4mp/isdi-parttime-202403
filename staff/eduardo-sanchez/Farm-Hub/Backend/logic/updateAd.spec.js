import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { expect } from 'chai';

import { User, Ad } from '../data/index.js';
import updateAd from './updateAd.js';
import { NotFoundError, ContentError, MatchError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;

const { ObjectId } = Types;

describe('updateAd', () => {
    before(() =>
        mongoose
            .connect(MONGODB_URL_TEST)
            .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
    );

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

    it('succeeds on updating an existing ad', () => {
        bcrypt
            .hash('123123123', 8)
            .then((hash) =>
                User.create({
                    name: 'Li',
                    surname: 'Nux',
                    email: 'li@nux.com',
                    username: 'linux',
                    password: hash,
                })
            )
            .then((user) =>
                Ad.create({
                    author: user.id,
                    title: 'beans',
                    description: 'green',
                    price: '3.5 €/Kg',
                    date: new Date(),
                    contactInfo: '777-777-777',
                    adcomments: [],
                    geoLocation: { lat: 39.466945, lng: -6.3758094 },
                })
            )

            .then((ad) => {
                return updateAd(
                    user.id,
                    ad.id,
                    'BEANS',
                    'RED',
                    '4.5 €/Kg',
                    '777-777-8888'
                );
            })

            .then(() => Ad.findById(ad._id))
            .then((updatedAd) => {
                expect(updatedAd.title).to.equal('BEANS');
                expect(updatedAd.description).to.equal('RED');
                expect(updatedAd.price).to.equal('4.5 €/Kg');
                expect(updatedAd.contactInfo).to.equal('777-777-8888');
            });
    });

    // it('succeeds on updating an existing ad', () => {
    //     let userId, adId;
    //     return bcrypt
    //         .hash('123123123', 8)
    //         .then((hash) =>
    //             User.create({
    //                 name: 'Li',
    //                 surname: 'Nux',
    //                 email: 'li@nux.com',
    //                 username: 'linux',
    //                 password: hash,
    //             })
    //         )
    //         .then((user) => {
    //             userId = user.id;
    //             return Ad.create({
    //                 author: user.id,
    //                 title: 'beans',
    //                 description: 'green',
    //                 price: '3.5 €/Kg',
    //                 date: new Date(),
    //                 contactInfo: '777-777-777',
    //                 adcomments: [],
    //                 geoLocation: { lat: 39.466945, lng: -6.3758094 },
    //             });
    //         })
    //         .then((ad) => {
    //             adId = ad.id;
    //             return updateAd(
    //                 userId,
    //                 adId,
    //                 'BEANS',
    //                 'RED',
    //                 '4.5 €/Kg',
    //                 '777-777-777'
    //             );
    //         })
    //         .then(() => Ad.findById(adId))
    //         .then((updated) => {
    //             expect(updated.title).to.equal('BEANS');
    //             expect(updated.description).to.equal('RED');
    //             expect(updated.price).to.equal('4.5 €/Kg');
    //             expect(updated.contactInfo).to.equal('777-777-777');
    //         });
    // });

    it('fails when ad does not exist', () => {
        return bcrypt
            .hash('123123123', 8)
            .then((hash) =>
                User.create({
                    name: 'Li',
                    surname: 'Nux',
                    email: 'li@nux.com',
                    username: 'linux',
                    password: hash,
                })
            )
            .then((user) =>
                updateAd(
                    user.id.toString(),
                    new ObjectId().toString(),
                    'BEANS',
                    'RED',
                    '4.5 €/Kg',
                    '777-777-777'
                )
            )
            .then(() => {
                throw new Error('Should have thrown NotFoundError');
            })
            .catch((error) => {
                expect(error).to.be.instanceOf(NotFoundError);
                expect(error.message).to.equal('Ad not found');
            });
    });

    it('fails on non-existing user', () => {
        let errorThrown;

        return updateAd(
            new ObjectId().toString(),
            new ObjectId().toString(),
            'BEANS',
            'RED',
            '4.5 €/Kg',
            '777-777-777'
        )
            .catch((error) => {
                errorThrown = error;
            })
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('User not found');
            });
    });

    it('fails when user cannot update an ad because it wasn not //its author', () => {
        let errorThrown;
        return bcrypt
            .hash('123123123', 8)
            .then((hash) =>
                User.create({
                    name: 'Li',
                    surname: 'Nux',
                    email: 'li@nux.com',
                    username: 'linux',
                    password: hash,
                })
            )
            .then((author) =>
                bcrypt.hash('123123123', 8).then((hash) =>
                    User.create({
                        name: 'Ma',
                        surname: 'Nuel',
                        email: 'ma@nuel.com',
                        username: 'manuel',
                        password: hash,
                    })
                        .then((user) =>
                            Ad.create({
                                author: author.id,
                                title: 'Carrots',
                                description: 'orange',
                                price: '1.5 €/Kg',
                                date: new Date(),
                                contactInfo: '555-555-5555',
                                adcomments: [],
                                geoLocation: {
                                    lat: 39.466945,
                                    lng: -6.3758094,
                                },
                            }).then((ad) =>
                                updateAd(
                                    user.id.toString(),
                                    ad.id.toString(),
                                    'Carrots',
                                    'orange',
                                    '1.5 €/Kg',
                                    '555-555-5555'
                                )
                            )
                        )
                        .then(() => {
                            throw new Error('Should have thrown MatchError');
                        })
                        .catch((error) => {
                            errorThrown = error;
                        })
                        .finally(() => {
                            expect(errorThrown).to.be.instanceOf(MatchError);
                            expect(errorThrown.message).to.equal(
                                'You did not create this ad, so you cannot update it'
                            );
                        })
                )
            );
    });

    //it('fails when user cannot update an ad because it wasn not //its author', () => {
    //    let errorThrown;

    //    bcrypt
    //        .hash('123123123', 8)
    //        .then((hash) =>
    //            User.create({
    //                name: 'Li',
    //                surname: 'Nux',
    //                email: 'li@nux.com',
    //                username: 'linux',
    //                password: hash,
    //            })
    //        )
    //        .then((user) =>
    //            Ad.create({
    //                author: user.id,
    //                title: 'Carrots',
    //                description: 'orange',
    //                price: '1.5 €/Kg',
    //                date: new Date(),
    //                contactInfo: '555-555-5555',
    //                adcomments: [],
    //                geoLocation: { lat: 39.466945, lng: -6.//3758094 },
    //            })
    //        )

    //        .then((ad) => {
    //            return updateAd(
    //                new ObjectId().toString(),
    //                ad.id,
    //                'BEANS',
    //                'RED',
    //                '4.5 €/Kg',
    //                '777-777-8888'
    //            );
    //        })

    //        .then(() => Ad.findById(ad._id))
    //        .then((updatedAd) => updatedAd))
    //        .catch((error) => {
    //            errorThrown = error;
    //        })
    //        .finally(() => {
    //            expect(errorThrown).to.be.instanceOf(MatchError);
    //            expect(errorThrown.message).to.equal(
    //                'You did not create this ad, so you cannot //update it'
    //            );
    //        });

    after(() =>
        Ad.deleteMany()
            .then(() => User.deleteMany())
            .then(() => mongoose.disconnect())
    );
});
