import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { expect } from 'chai';
import { Ad, User } from '../data/index.js';

import deleteAdComment from './deleteAdComment.js';
import { NotFoundError, ContentError, MatchError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;
const { ObjectId } = Types;

describe('deleteAdComment', () => {
    before(() =>
        mongoose
            .connect(MONGODB_URL_TEST)
            .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
    );

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

    it('succeeds on deleting an ad comment by its author', () =>
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
                    adcomments: [
                        {
                            author: user._id.toString(),
                            comment: 'Nice ad!',
                            date: new Date(),
                        },
                    ],
                    geoLocation: { lat: 0, lng: 0 },
                }).then((ad) => {
                    const commentIdToDelete = ad.adcomments[0]._id.toString();
                    return deleteAdComment(user.id, ad.id, commentIdToDelete)
                        .then(() => Ad.findById(ad.id))
                        .then((updateAdComments) => {
                            expect(
                                updateAdComments.adcomments
                            ).to.have.lengthOf(0);
                        });
                })
            ));

    it('succeeds on deleting a specific comment without affecting other comments', () =>
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
                    adcomments: [
                        {
                            author: user._id.toString(),
                            comment: 'Nice ad!',
                            date: new Date(),
                        },
                        {
                            author: user._id.toString(),
                            comment: 'Interesting!',
                            date: new Date(),
                        },
                    ],
                    geoLocation: { lat: 0, lng: 0 },
                }).then((ad) => {
                    const commentIdToDelete = ad.adcomments[0]._id.toString();
                    return deleteAdComment(user.id, ad.id, commentIdToDelete)
                        .then(() => Ad.findById(ad.id))
                        .then((updatedAd) => {
                            expect(updatedAd.adcomments).to.have.lengthOf(1);
                            expect(updatedAd.adcomments[0].comment).to.equal(
                                'Interesting!'
                            );
                        });
                })
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
            adcomments: [
                {
                    author: new ObjectId().toString(),
                    comment: 'Nice ad!',
                    date: new Date(),
                },
            ],
            geoLocation: { lat: 0, lng: 0 },
        }).then((ad) => {
            const commentIdToDelete = ad.adcomments[0]._id.toString();
            return deleteAdComment(
                new ObjectId().toString(),
                ad.id,
                commentIdToDelete
            )
                .catch((error) => (errorThrown = error))
                .finally(() => {
                    expect(errorThrown).to.be.instanceOf(MatchError);
                    expect(errorThrown.message).to.equal(
                        'comment author does not match user & cannot be deleted'
                    );
                });
        });
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
                deleteAdComment(
                    user.id,
                    new ObjectId().toString(),
                    new ObjectId().toString()
                )
                    .catch((error) => (errorThrown = error))
                    .finally(() => {
                        expect(errorThrown).to.be.instanceOf(NotFoundError);
                        expect(errorThrown.message).to.equal('ad not found');
                    })
            );
    });

    it('fails on non-existing comment', () => {
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
                Ad.create({
                    author: user._id.toString(),
                    title: 'Limones',
                    description: 'Luneros',
                    price: '8.5 €/Kg',
                    date: new Date(),
                    contactInfo: '092-092-092',
                    adcomments: [
                        {
                            author: user._id.toString(),
                            comment: 'Nice ad!',
                            date: new Date(),
                        },
                    ],
                    geoLocation: { lat: 0, lng: 0 },
                }).then((ad) => {
                    const nonExistingCommentId = new ObjectId().toString();

                    deleteAdComment(user.id, ad.id, nonExistingCommentId)
                        .catch((error) => (errorThrown = error))
                        .finally(() => {
                            expect(errorThrown).to.be.instanceOf(NotFoundError);
                            expect(errorThrown.message).to.equal(
                                'ad not found'
                            );
                        });
                })
            );
    });

    it('fails on invalid userId', () => {
        let errorThrown;

        try {
            deleteAdComment(
                'invalid-id',
                new ObjectId().toString(),
                new ObjectId().toString()
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
            deleteAdComment(
                new ObjectId().toString(),
                'invalid-id',
                new ObjectId().toString()
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('adId is not valid');
        }
    });

    it('fails on invalid commentId', () => {
        let errorThrown;

        try {
            deleteAdComment(
                new ObjectId().toString(),
                new ObjectId().toString(),
                'invalid-id'
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('commentId is not valid');
        }
    });

    // it('fails on trying to delete a comment by a user who is not the author', () => {
    it('fails on trying to delete a comment by a user who is not the author', () => {
        let errorThrown;

        return Ad.create({
            author: new ObjectId(),
            title: 'Limones',
            description: 'Luneros',
            price: '8.5 €/Kg',
            date: new Date(),
            contactInfo: '092-092-092',
            adcomments: [
                {
                    author: new ObjectId().toString(),
                    comment: 'Nice ad!',
                    date: new Date(),
                },
            ],
            geoLocation: { lat: 0, lng: 0 },
        }).then((ad) => {
            const commentId = ad.adcomments[0]._id.toString();
            deleteAdComment(new ObjectId().toString(), ad.id, commentId)
                .catch((error) => (errorThrown = error))
                .finally(() => {
                    expect(errorThrown).to.be.instanceOf(MatchError);
                    expect(errorThrown.message).to.equal(
                        'comment author does not match user & cannot be deleted'
                    );
                });
        });
    });

    after(() =>
        Ad.deleteMany()
            .then(() => User.deleteMany())
            .then(() => mongoose.disconnect())
    );
});

/*
import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { Ad, User } from '../data/index.js'

import deleteAdComment from './deleteAdComment.js'
import { NotFoundError, ContentError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('deleteAdComment', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Ad.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))

    it('succeeds on deleting a comment by an existing user', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Li', surname: 'Nux', email: 'li@nux.com', username: 'linux', password: hash }))
            .then(user =>
                Ad.create({ 
                    author: user._id.toString(), 
                    title: 'Limones', 
                    description: 'Luneros', 
                    price: '8.5 €/Kg', 
                    date: new Date(), 
                    adcomments: [{ 
                        author: user._id.toString(), 
                        comment: 'Nice ad!', 
                        date: new Date() 
                    }] 
                })
                .then(ad => {
                    const commentId = ad.adcomments[0]._id.toString()
                    return deleteAdComment(user.id, ad.id, commentId)
                        .then(() => Ad.findById(ad.id))
                        .then(updatedAd => {
                            expect(updatedAd.adcomments).to.have.lengthOf(0)
                        })
                })
            )
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return Ad.create({
            author: new ObjectId(),
            title: 'Limones',
            description: 'Luneros',
            price: '8.5 €/Kg',
            date: new Date(),
            adcomments: [{
                author: new ObjectId().toString(),
                comment: 'Nice ad!',
                date: new Date()
            }]
        })
        .then(ad => {
            const commentId = ad.adcomments[0]._id.toString()
            return deleteAdComment(new ObjectId().toString(), ad.id, commentId)
                .catch(error => errorThrown = error)
                .finally(() => {
                    expect(errorThrown).to.be.instanceOf(MatchError)
                    expect(errorThrown.message).to.equal('comment author does not match user & cannot be deleted')
                })
        })
    })

    it('fails on non-existing ad', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Li', surname: 'Nux', email: 'li@nux.com', username: 'linux', password: hash }))
            .then(user =>
                deleteAdComment(user.id, new ObjectId().toString(), new ObjectId().toString())
                    .catch(error => errorThrown = error)
                    .finally(() => {
                        expect(errorThrown).to.be.instanceOf(NotFoundError)
                        expect(errorThrown.message).to.equal('ad not found')
                    })
            )
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            deleteAdComment('invalid-id', new ObjectId().toString(), new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid adId', () => {
        let errorThrown

        try {
            deleteAdComment(new ObjectId().toString(), 'invalid-id', new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('adId is not valid')
        }
    })

    it('fails on invalid commentId', () => {
        let errorThrown

        try {
            deleteAdComment(new ObjectId().toString(), new ObjectId().toString(), 'invalid-id')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('commentId is not valid')
        }
    })

    it('fails on comment author does not match user', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
            .then(hash => {
                const user = new User({
                    name: 'Li',
                    surname: 'Nux',
                    email: 'li@nux.com',
                    username: 'linux',
                    password: hash
                })
                const ad = new Ad({
                    author: new ObjectId().toString(),
                    title: 'Limones',
                    description: 'Luneros',
                    price: '10 €/Kg',
                    date: new Date(),
                    adcomments: [{
                        author: new ObjectId().toString(),
                        comment: 'Nice ad!',
                        date: new Date()
                    }]
                })
                return Promise.all([user.save(), ad.save()])
                    .then(([savedUser, savedAd]) => {
                        const commentId = savedAd.adcomments[0]._id.toString()
                        return deleteAdComment(savedUser.id.toString(), savedAd.id.toString(), commentId)
                    })
                    .catch(error => errorThrown = error)
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(MatchError)
                expect(errorThrown.message).to.equal('comment author does not match user & cannot be deleted')
            })
    })

    after(() => Ad.deleteMany().then(() => User.deleteMany()).then(() => mongoose.disconnect()))
})
*/
