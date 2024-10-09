import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

import { expect } from 'chai';
import { Ad, User } from '../data/index.js';
import getUserComments from './getUserComments.js';
import { NotFoundError, ContentError, CredentialsError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;
const { ObjectId } = Types;

describe('getUserComments', () => {
    before(() =>
        mongoose
            .connect(MONGODB_URL_TEST)
            .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
    );

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

    it('succeeds on getting user comments', () => {
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
                    adcomments: [
                        {
                            author: user.id.toString(),
                            comment: 'Comentario de prueba',
                            date: new Date(),
                        },
                    ],
                    geoLocation: {
                        lat: 58,
                        lng: 98,
                    },
                }).then(() => user)
            )
            .then((user) => getUserComments(user.id.toString()))
            .then((ads) => {
                expect(ads).to.be.an('array');
                expect(ads.length).to.be.greaterThan(0);
                expect(ads[0].adcomments).to.be.an('array');
                expect(ads[0].adcomments.length).to.be.greaterThan(0);
                expect(ads[0].adcomments).to.be.an('array');
            });
    });

    it('fails when user does not exist', () => {
        let errorThrown;

        return getUserComments(new ObjectId().toString())
            .catch((error) => (errorThrown = error))
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('user not found');
            });
    });

    it('fails when there are no ads with user comments', () => {
        let errorThrown;

        return bcrypt
            .hash('123123123', 8)
            .then((hash) =>
                User.create({
                    name: 'No',
                    surname: 'Comments',
                    email: 'no@comments.com',
                    username: 'nocomments',
                    password: hash,
                })
            )
            .then((user) => getUserComments(user.id.toString()))
            .catch((error) => {
                errorThrown = error;

                expect(errorThrown).to.be.an('error');
                expect(errorThrown.message).to.equal(
                    'No ads found with user comments'
                );
            });
    });

    // it('fails when no comments by user are found in ads', () => {
    //     let errorThrown;

    //     return bcrypt.hash('123123123', 8)
    //         .then(hash => User.create({
    //             name: 'User',
    //             surname: 'No Comments',
    //             email: 'user@nocomments.com',
    //             username: 'usernocomments',
    //             password: hash,
    //         }))
    //         .then(user => {
    //             // Create an ad with comments from other users, but not from this user
    //             return Ad.create({
    //                 author: user.id.toString(),
    //                 title: 'Ad with Other Comments',
    //                 description: 'This ad has comments from other users.',
    //                 price: '10 €/Kg',
    //                 date: new Date(),
    //                 adcomments: [
    //                     {
    //                         author: new ObjectId().toString(), // this comment is not the user created above
    //                         comment: 'This is a comment from another user.',
    //                         date: new Date()
    //                     }
    //                 ],
    //             }).then(() => user);
    //         })
    //         .then(user => getUserComments(user.id.toString()))
    //         .catch(error => {
    //             errorThrown = error;
    //             expect(errorThrown).to.be.an.instanceOf(NotFoundError);
    //             expect(errorThrown.message).to.equal('No comments found for this user');
    //         });
    // });

    after(() =>
        Ad.deleteMany()
            .then(() => User.deleteMany())
            .then(() => mongoose.disconnect())
    );
});
