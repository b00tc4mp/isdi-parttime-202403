import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { expect } from 'chai';

import { User, Ad } from '../data/index.js';
import updateAd from './updateAd.js';
import { NotFoundError, MatchError, ContentError } from 'com/errors.js';

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

    it('fails when user cannot update an ad because it is not its author', () => {
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

    it('fails on invalid title', () => {
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
            .then((user) =>
                updateAd(
                    user.id.toString(),
                    new ObjectId().toString(),
                    '',
                    'RED',
                    '4.5 €/Kg',
                    '777-777-777'
                )
            )

            .catch((error) => {
                errorThrown = error;
            })
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(ContentError);
                expect(errorThrown.message).to.equal('title is not valid');
            });
    });

    it('fails on invalid description', () => {
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
            .then((user) =>
                updateAd(
                    user.id.toString(),
                    new ObjectId().toString(),
                    'Carrots',
                    '',
                    '4.5 €/Kg',
                    '777-777-777'
                )
            )
            .catch((error) => {
                errorThrown = error;
            })
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(ContentError);
                expect(errorThrown.message).to.equal(
                    'description is not valid'
                );
            });
    });

    it('fails on invalid price', () => {
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
            .then((user) =>
                updateAd(
                    user.id.toString(),
                    new ObjectId().toString(),
                    'Carrots',
                    'RED',
                    '',
                    '777-777-777'
                )
            )
            .catch((error) => {
                errorThrown = error;
            })
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(ContentError);
                expect(errorThrown.message).to.equal(
                    'price is not valid. It must be in the format "number €/Kg", e.g., "3.20 €/Kg".'
                );
            });
    });

    it('fails on invalid contactInfo', () => {
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
            .then((user) =>
                updateAd(
                    user.id.toString(),
                    new ObjectId().toString(),
                    'Carrots',
                    'RED',
                    '4.5 €/Kg',
                    ''
                )
            )
            .catch((error) => {
                errorThrown = error;
            })
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(ContentError);
                expect(errorThrown.message).to.equal(
                    'contactInfo is not valid'
                );
            });
    });

    after(() =>
        Ad.deleteMany()
            .then(() => User.deleteMany())
            .then(() => mongoose.disconnect())
    );
});
