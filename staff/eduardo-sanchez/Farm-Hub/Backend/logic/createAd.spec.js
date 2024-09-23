import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { expect } from 'chai';

import { User, Ad } from '../data/index.js';
import createAd from './createAd.js';
import { NotFoundError, ContentError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;

const { ObjectId } = Types;

describe('createAd', () => {
    before(() =>
        mongoose
            .connect(MONGODB_URL_TEST)
            .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
    );

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

    it('succeeds on creating an ad from an existing user', () =>
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
                createAd(
                    user.id,
                    'Limones',
                    'Luneros',
                    '8.5 €/Kg',
                    '092-092-092',
                    {
                        lat: 54,
                        lng: 98,
                    }
                )
                    .then(() => Ad.findOne())
                    .then((ad) => {
                        expect(ad.author.toString()).to.equal(
                            user.id.toString()
                        );
                        expect(ad.title).to.equal('Limones');
                        expect(ad.description).to.equal('Luneros');
                        expect(ad.price).to.equal('8.5 €/Kg');
                        expect(ad.date).to.be.a('date');
                        expect(ad.adcomments).to.be.an('array'); //.that.is.empty
                    })
            ));

    it('fails on non-existing user', () => {
        let errorThrown;

        return createAd(
            new ObjectId().toString(),
            'Ad Title',
            'Ad Description',
            '8.5 €/Kg',
            '092-092-092',
            {
                lat: 54,
                lng: 98,
            }
        )
            .catch((error) => (errorThrown = error))
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('user not found');
            });
    });

    it('fails on invalid userId', () => {
        let errorThrown;

        try {
            createAd(
                'invalid-id',
                'Ad Title',
                'Ad Description',
                '8.5 €/Kg',
                '092-092-092',
                {
                    lat: 54,
                    lng: 98,
                }
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('userId is not valid');
        }
    });

    it('fails on invalid title', () => {
        let errorThrown;

        try {
            createAd(
                new ObjectId().toString(),
                '',
                'Ad Description',
                '8.5 €/Kg',
                '092-092-092',
                {
                    lat: 54,
                    lng: 98,
                }
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('title is not valid');
        }
    });

    it('fails on invalid description', () => {
        let errorThrown;

        try {
            createAd(
                new ObjectId().toString(),
                'Ad Title',
                '',
                '8.5 €/Kg',
                '092-092-092',
                {
                    lat: 54,
                    lng: 98,
                }
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('description is not valid');
        }
    });

    it('fails on invalid price', () => {
        let errorThrown;
        try {
            createAd(
                new ObjectId().toString(),
                'Ad Title',
                'Ad Description',
                '8.5',
                '092-092-092',
                {
                    lat: 54,
                    lng: 98,
                }
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal(
                'price is not valid. It must be in the format "number €/Kg", e.g., "3.20 €/Kg".'
            );
        }
    });

    it('fails on missing geoLocation', () => {
        let errorThrown;
        try {
            createAd(
                new ObjectId().toString(),
                'Ad Title',
                'Ad Description',
                '8.5 €/Kg',
                '092-092-092'
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('geoLocation is missing');
        }
    });

    it('fails on invalid geoLocation', () => {
        let errorThrown;
        try {
            createAd(
                new ObjectId().toString(),
                'Ad Title',
                'Ad Description',
                '8.5 €/Kg',
                '092-092-092',
                { lat: 'aa', lng: 'bb' }
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal(
                'geoLocation is not valid: lat and lng must be numbers'
            );
        }
    });

    after(() =>
        Promise.all([User.deleteMany(), Ad.deleteMany()]).then(() =>
            mongoose.disconnect()
        )
    );
});

//   it("fails on invalid geoLocation", () => {
//     let errorThrown;
//     try {
//       createAd(
//         new ObjectId().toString(),
//         "Ad Title",
//         "Ad Description",
//         "8.5 €/Kg",
//         "invalid"
//       );
//     } catch (error) {
//       errorThrown = error;
//     } finally {
//       expect(errorThrown).to.be.instanceOf(ContentError);
//       expect(errorThrown.message).to.equal("geoLocation is not valid");
//     }
//   });
