import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { expect } from 'chai';
import { Ad, User } from '../data/index.js';

import createAdComment from './createAdComment.js';
import { NotFoundError, ContentError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;
const { ObjectId } = Types;

describe('createAdComment', () => {
    before(() =>
        mongoose
            .connect(MONGODB_URL_TEST)
            .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
    );

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

    it('succeeds on adding a comment to an existing ad by an existing user', () =>
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
                    author: user._id.toString(),
                    title: 'Limones',
                    description: 'Luneros',
                    price: '8.5 €/Kg',
                    date: new Date(),
                    contactInfo: '092-092-092',
                    adcomments: [],
                    geoLocation: { lat: 0, lng: 0 },
                }).then((ad) =>
                    createAdComment(user.id, ad.id, 'Nice Ad!')
                        .then(() => Ad.findById(ad.id))
                        .then((ad) => {
                            expect(ad.adcomments).to.have.lengthOf(1);
                            expect(ad.adcomments[0].author.toString()).to.equal(
                                user.id.toString()
                            );
                            expect(ad.adcomments[0].comment).to.equal(
                                'Nice Ad!'
                            );
                            expect(ad.adcomments[0].date).to.be.a('date');
                        })
                )
            ));

    it('fails on non-existing user', () => {
        let errorThrown;

        return Ad.create({
            author: new ObjectId(),
            title: 'Limones',
            description: 'Luneros',
            price: '8.5 €/Kg',
            date: new Date(),
            contactInfo: '092-092-092',
            adcomments: [],
            geoLocation: { lat: 0, lng: 0 },
        }).then((ad) =>
            createAdComment(new ObjectId().toString(), ad.id, 'Nice Ad!')
                .catch((error) => (errorThrown = error))
                .finally(() => {
                    expect(errorThrown).to.be.instanceOf(NotFoundError);
                    expect(errorThrown.message).to.equal('user not found');
                })
        );
    });

    it('fails on non-existing ad', () => {
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
                createAdComment(user.id, new ObjectId().toString(), 'Nice Ad!')
                    .catch((error) => (errorThrown = error))
                    .finally(() => {
                        expect(errorThrown).to.be.instanceOf(NotFoundError);
                        expect(errorThrown.message).to.equal('ad not found');
                    })
            );
    });

    it('fails on invalid userId', () => {
        let errorThrown;

        try {
            createAdComment(
                'invalid-id',
                new ObjectId().toString(),
                'Nice Ad!'
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('userId is not valid');
        }
    });

    it('fails on invalid adId', () => {
        let errorThrown;

        try {
            createAdComment(
                new ObjectId().toString(),
                'invalid-id',
                'Nice Ad!'
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('adId is not valid');
        }
    });

    it('fails on invalid comment text', () => {
        let errorThrown;

        try {
            createAdComment(
                new ObjectId().toString(),
                new ObjectId().toString(),
                ''
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('comment is not valid');
        }
    });
    after(() =>
        Ad.deleteMany()
            .then(() => User.deleteMany())
            .then(() => mongoose.disconnect())
    );
});

// it('succeeds on creating an ad comment from an existing user', () => {
//     return bcrypt.hash('123123123', 8)
//         .then(hash => User.create({ name: 'Li', surname: 'Nux', email: 'li@nux.com', username: 'linux', password: hash }))
//         .then(user =>
//             createAdComments(user.id, new ObjectId().toString(), 'This is a comment')
//                 .then(() => Ad.findOne())
//                 .then(ad => {
//                     expect(ad.adcomments).to.be.an('array').that.is.not.empty
//                     expect(ad.adcomments[0].author.toString()).to.equal(user.id.toString())
//                     expect(ad.adcomments[0].comment).to.equal('This is a comment')

//                 })
//         )
// })

// it('fails on non-existing user', () => {
//     let errorThrown

//     return createAdComment(new ObjectId().toString(), new ObjectId().toString(), 'Nice Ad!')
//         .catch(error => errorThrown = error)

//         .finally(() => {
//             expect(errorThrown).to.be.instanceOf(NotFoundError)
//             expect(errorThrown.message).to.equal('user not found')
//         })
// })

// it('fails on invalid adId', () => {
//     let errorThrown

//     return bcrypt.hash('123123123', 8)
//         .then(hash => User.create({ name: 'Li', surname: 'Nux', email: 'li@nux.com', username: 'linux', password: hash }))
//         .then(user => {
//             try {
//                 createAdComment(user.id, 'invalid-id', 'Nice Ad!')
//             } catch (error) {
//                 errorThrown = error
//             } finally {
//                 expect(errorThrown).to.be.instanceOf(ContentError)
//                 expect(errorThrown.message).to.equal('adId is not valid')
//             }
//         })
// })

// it('fails on invalid comment text', () => {
//     let errorThrown

//     return bcrypt.hash('123123123', 8)
//         .then(hash => User.create({ name: 'Li', surname: 'Nux', email: 'li@nux.com', username: 'linux', password: hash }))
//         .then(user =>
//             Ad.create({ author: user._id.toString(), title: 'Limones', description: 'Luneros', price: '8.5 €/Kg', date: new Date(), adcomments: [] })
//                 .then(ad => {
//                     try {
//                         createAdComment(user.id, ad.id, '')
//                     } catch (error) {
//                         errorThrown = error
//                     } finally {
//                         expect(errorThrown).to.be.instanceOf(ContentError)
//                         expect(errorThrown.message).to.equal('comment is not valid')
//                     }
//                 })
//         )
// })
