import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

import { expect } from 'chai';
import { Ad, User } from '../data/index.js';
import getUserAds from './getUserAds.js';
import { NotFoundError, ContentError, CredentialsError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;
const { ObjectId } = Types;

describe('getUserAds', () => {
    before(() =>
        mongoose
            .connect(MONGODB_URL_TEST)
            .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
    );

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

    it('succeeds on getting user ads', () => {
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
                    adcomments: [],

                })
                    .then(() => user))
            .then((user) => getUserAds(user.id, user.id))
            .then((ads) => {
                expect(ads).to.be.an('array');
                expect(ads.length).to.equal(1);
                expect(ads[0].author.username).to.equal('linux')
                expect(ads[0].author).to.be.an('object');
                expect(ads[0]).to.have.property('title', 'Limones');
                expect(ads[0]).to.have.property('description', 'Luneros');
                expect(ads[0]).to.have.property('price', '8.5 €/Kg');
                expect(ads[0]).to.have.property('date');
                expect(ads[0].date).to.be.instanceOf(Date);
                expect(ads[0].adcomments).to.be.an('array');
            });
    });

    it('fails when userId does not match tokenId', () => {
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
                getUserAds(user.id, new ObjectId().toString()))
            .catch((error) => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('User ID do not match the token User ID')
            })
    });

    it('fails when user does not exist', () => {
        let errorThrown;
        const nonExistentId = new ObjectId().toString();
        console.log(nonExistentId)
        return getUserAds(nonExistentId, nonExistentId)

            .catch((error) => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('User not found');
            });
    });

    it('fails when user has no ads', () => {
        let errorThrown;

        return bcrypt
            .hash('123123123', 8)
            .then((hash) =>
                User.create({
                    name: 'No',
                    surname: 'Ads',
                    email: 'no@ads.com',
                    username: 'noads',
                    password: hash,
                })
            )
            .then((user) => {
                console.log('user: ', user)
                // getUserAds(user.id, user.id)
                let tokenId = user.id
                console.log('tokenId: ', tokenId)
                return getUserAds(user.id, tokenId)
            })
            //getUserAds(user.id, user.id))
            .then((ads) => {
                console.log('ads: ', ads)
                return expect(ads).to.be.an('array').that.is.empty
            })

            //expect(ads).to.be.an('array').that.is.not.empty)
            .catch((error) => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('Ads not found');
            });
    });

    it('fails with invalid userId', () => {
        let errorThrown;

        try {
            getUserAds('invalid-id', new ObjectId().toString());
        } catch (error) {
            errorThrown = error;
        }

        expect(errorThrown).to.be.an.instanceOf(ContentError);
        expect(errorThrown.message).to.equal('userId is not valid');
    });

    it('fails with invalid tokenUserId', () => {
        let errorThrown;

        try {
            getUserAds(new ObjectId().toString(), 'invalid-id');
        } catch (error) {
            errorThrown = error;
        }

        expect(errorThrown).to.be.an.instanceOf(ContentError);
        expect(errorThrown.message).to.equal('tokenUserId is not valid');
    });

    after(() =>
        Ad.deleteMany()
            .then(() => User.deleteMany())
            .then(() => mongoose.disconnect())
    );

})

// it('fails on non-existing user', () => {
//     let errorThrown;

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
//         .then((user) =>

//     getUserAds('', new ObjectId().toString())
//         .catch((error) => errorThrown = error)
//         .finally(() => {

//             expect(errorThrown).to.be.an.instanceOf(NotFoundError)
//             expect(errorThrown.message).to.equal('User not found')
//         })

// });








