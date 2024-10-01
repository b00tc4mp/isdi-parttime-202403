import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

import { expect } from 'chai';
import { Ad, User } from '../data/index.js';
import searchAds from './searchAds.js';
import { NotFoundError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;

describe('searchAds', () => {
    before(() =>
        mongoose
            .connect(MONGODB_URL_TEST)
            .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
    );

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

    it('succeeds on finding ads matching the search text and filtering by distance', () => {
        return bcrypt
            .hash('password', 8)
            .then((hash) => {
                return User.create({
                    name: 'Li',
                    surname: 'Nux',
                    email: 'li@nux.com',
                    username: 'linux',
                    password: hash,
                }).then((user) => {
                    return Ad.create([
                        {
                            author: user._id.toString(),
                            title: 'Fresh Oranges',
                            description: 'Juicy and fresh oranges.',
                            price: '5 €/Kg',
                            date: new Date(),
                            contactInfo: '092-092-092',
                            adcomments: [],
                            geoLocation: {
                                lat: 39.40394,
                                lng: -6.270353,
                            },
                        },

                        {
                            author: user._id.toString(),
                            title: 'fresh apples',
                            description: 'Yummy apples.',
                            price: '7 €/Kg',
                            date: new Date(),
                            contactInfo: '093-093-093',
                            adcomments: [],
                            geoLocation: {
                                lat: 40.891856,
                                lng: -5.76514,
                            },
                        },
                    ]);
                });
            })
            .then(() =>
                searchAds('Fresh', { lat: 39.466945, lng: -6.3758094 }, 50)
            )
            .then((ads) => {
                expect(ads).to.be.an('array');
                expect(ads).to.have.lengthOf(1);
                expect(ads[0])
                    .to.have.property('title')
                    .that.includes('Fresh Oranges');
                expect(ads[0])
                    .to.have.property('price')
                    .that.includes('5 €/Kg');
                expect(ads[0])
                    .to.have.property('description')
                    .that.includes('Juicy and fresh oranges.');
                expect(ads[0]).to.have.property('author').that.is.an('object');
                expect(ads[0].author).to.have.property('username', 'linux');
            });
    });

    it('fails on non-existing ads', () => {
        let errorThrown;

        return searchAds('Nonexistent', { lat: 40.891856, lng: -5.76514 }, 50)
            .catch((error) => (errorThrown = error))
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('ads not found');
            });
    });

    it('fails on non-existing ads', () => {
        let errorThrown;

        return bcrypt
            .hash('password', 8)
            .then((hash) => {
                return User.create({
                    name: 'Li',
                    surname: 'Nux',
                    email: 'li@nux.com',
                    username: 'linux',
                    password: hash,
                }).then((user) => {
                    return Ad.create({
                        author: user._id.toString(),
                        title: 'Fresh Tomatoes',
                        description: 'Juicy and fresh oranges.',
                        price: '5 €/Kg',
                        date: new Date(),
                        contactInfo: '092-092-092',
                        adcomments: [],
                        geoLocation: {
                            lat: 39.40394,
                            lng: -6.270353,
                        },
                    });
                });
            })
            .then(() =>
                searchAds('Nonexinting', { lat: 39.40394, lng: -3.270353 }, 50)
            )
            .catch((error) => (errorThrown = error))
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('ads not found');
            });
    });

    after(() =>
        Ad.deleteMany()
            .then(() => User.deleteMany())
            .then(() => mongoose.disconnect())
    );
});
