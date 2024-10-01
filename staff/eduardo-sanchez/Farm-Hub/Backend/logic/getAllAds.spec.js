import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

import { expect } from 'chai';
import { Ad, User } from '../data/index.js';
import getAllAds from './getAllAds.js';
import { NotFoundError, ContentError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;
const { ObjectId } = Types;

describe('getAllAds', () => {
    before(() =>
        mongoose
            .connect(MONGODB_URL_TEST)
            .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
    );

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

    it('succeeds on getting all ads', () => {
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
                Ad.create({
                    author: user.id.toString(),
                    title: 'Limones',
                    description: 'Luneros',
                    price: '8.5 €/Kg',
                    date: new Date(),
                    contactInfo: '092-092-092',
                    adcomments: [],
                    geoLocation: {
                        lat: 59,
                        lng: 28,
                    },
                }).then(() => user)
            )
            .then((user) => getAllAds(user.id))
            .then((ads) => {
                console.log(ads);
                expect(ads).to.be.an('array');
                expect(ads.length).to.equal(1);
                expect(ads[0].author.username).to.equal('linux');
                expect(ads[0].author).to.be.an('object');
                expect(ads[0]).to.have.property('title', 'Limones');
                expect(ads[0]).to.have.property('description', 'Luneros');
                expect(ads[0]).to.have.property('price', '8.5 €/Kg');
                expect(ads[0]).to.have.property('date');
                expect(ads[0].date).to.be.instanceOf(Date);
                expect(ads[0].adcomments).to.be.an('array');
            });
    });

    it('fails on non-existing user', () => {
        let errorThrown;

        return getAllAds(new ObjectId().toString())
            .catch((error) => (errorThrown = error))
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('user not found');
            });
    });

    it('fails on non-existing ads', () => {
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
            .then((user) => getAllAds(user.id.toString()))
            .catch((error) => (errorThrown = error))
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('ads not found');
            });
    });

    it('fail on invalid userId', () => {
        let errorThrown;
        try {
            getAllAds('invalid-id');
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('userId is not valid');
        }
    });

    after(() =>
        Ad.deleteMany()
            .then(() => User.deleteMany())
            .then(() => mongoose.disconnect())
    );
});
