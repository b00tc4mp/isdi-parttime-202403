import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { expect } from 'chai';
import { Ad, User } from '../data/index.js';

import deleteAd from './deleteAd.js';
import { NotFoundError, ContentError, MatchError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;
const { ObjectId } = Types;

describe('deleteAd', () => {
    before(() =>
        mongoose
            .connect(MONGODB_URL_TEST)
            .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
    );

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

    it('succeeds on deleting an ad by its author', () =>
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
                    adcomments: [],
                    geoLocation: {
                        lat: 0,
                        lng: 0,
                    },
                }).then((ad) =>
                    deleteAd(user.id, ad.id)
                        .then(() => Ad.findById(ad.id))
                        .then((deletedAd) => {
                            expect(deletedAd).to.be.null;
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
            adcomments: [],
            geoLocation: {
                lat: 0,
                lng: 0,
            },
        }).then((ad) =>
            deleteAd(new ObjectId().toString(), ad.id)
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
                deleteAd(user.id, new ObjectId().toString())
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
            deleteAd('invalid-id', new ObjectId().toString());
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
            deleteAd(new ObjectId().toString(), 'invalid-id');
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('adId is not valid');
        }
    });

    it('fails on ad author does not match user wanting to delete ad', () => {
        let errorThrown;

        return bcrypt
            .hash('123123123', 8)
            .then((hash) => {
                const user = new User({
                    name: 'Li',
                    surname: 'Nux',
                    email: 'li@nux.com',
                    username: 'linux',
                    password: hash,
                });
                const ad = new Ad({
                    author: new ObjectId().toString(),
                    title: 'Limones',
                    description: 'Luneros',
                    price: '10 €/Kg',
                    date: new Date(),
                    adcomments: [],
                    geoLocation: {
                        lat: 0,
                        lng: 0,
                    },
                });
                return Promise.all([user.save(), ad.save()])
                    .then(([savedUser, savedAd]) => {
                        return deleteAd(
                            savedUser.id.toString(),
                            savedAd.id.toString()
                        );
                    })
                    .catch((error) => (errorThrown = error));
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(MatchError);
                expect(errorThrown.message).to.equal(
                    'ad author does not match user & cannot be deleted'
                );
            });
    });

    after(() =>
        Ad.deleteMany()
            .then(() => User.deleteMany())
            .then(() => mongoose.disconnect())
    );
});

// it('fails on mismatching ad author', () => {
//     let errorThrown

//     return Promise.all([
//         bcrypt.hash('123123123', 8).then(hash => User.create({ name: 'User1', surname: 'One', email: 'user1@one.com', username: 'user1', password: hash })),
//         bcrypt.hash('123123123', 8).then(hash => User.create({ name: 'User2', surname: 'Two', email: 'user2@two.com', username: 'user2', password: hash }))
//     ])
//         .then(([user1, user2]) =>
//             Ad.create({ author: user1._id, title: 'Hola', description: 'funcionará el test?', price: '10 €/Kg', date: new Date(), adcomments: [] })
//                 .then(ad => deleteAd(user2._id.toString(), ad._id.toString()))
//         )
//         .catch(error => errorThrown = error)
//         .finally(() => {
//             expect(errorThrown).to.be.an.instanceOf(MatchError)
//             expect(errorThrown.message).to.equal('ad author does not match user & cannot be deleted')
//         })
// })

// //////////////////////////////////

// it('fails on trying to delete an ad by a user who is not the author', () => {
//     let user1, user2;
//     let ad;

//     return bcrypt.hash('123123123', 8)
//         .then(hash => User.create({ name: 'Li', surname: 'Nux', email: 'li@nux.com', username: 'linux', password: hash }))
//         .then(createdUser => {
//             user1 = createdUser;
//             return bcrypt.hash('456456456', 8)
//         })
//         .then(hash => User.create({ name: 'Jo', surname: 'Doe', email: 'jo@doe.com', username: 'johndoe', password: hash }))
//         .then(createdUser => {
//             user2 = createdUser;
//             return Ad.create({ author: user1._id.toString(), title: 'Limones', description: 'Luneros', price: '8.5 €/Kg', date: new Date(), adcomments: [] })
//         })
//         .then(createdAd => {
//             ad = createdAd;
//             return deleteAd(user2.id, ad.id)
//         })
//         .catch(error => {
//             errorThrown = error;
//         })
//         .finally(() => {
//             expect(errorThrown).to.be.instanceOf(MatchError);
//             expect(errorThrown.message).to.equal('ad author does not match user & cannot be deleted');
//         });
// });

/////////////

// import 'dotenv/config'
// import mongoose, { Types } from 'mongoose'
// import bcrypt from 'bcryptjs'
// import { expect } from 'chai'
// import { User, Ad } from '../data/index.js'
// import deleteAd from './deleteAd.js'
// import { NotFoundError, MatchError, SystemError } from 'com/errors.js'

// const { MONGODB_URL_TEST } = process.env
// const { ObjectId } = Types

// describe('deleteAd', () => {
//     before(() => mongoose.connect(MONGODB_URL_TEST)
//         .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()])))

//     beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))

//     it('succeeds on deleting an ad by its author', () => {
//         let user;
//         let ad;

//         return bcrypt.hash('123123123', 8)
//             .then(hash => User.create({ name: 'Li', surname: 'Nux', email: 'li@nux.com', username: 'linux', password: hash }))
//             .then(createdUser => {
//                 user = createdUser;
//                 return Ad.create({ author: user._id.toString(), title: 'Limones', description: 'Luneros', price: '8.5 €/Kg', date: new Date(), adcomments: [] })
//             })
//             .then(createdAd => {
//                 ad = createdAd;
//                 return deleteAd(user.id, ad.id)
//             })
//             .then(deletedAdId => {
//                 expect(deletedAdId).to.equal(ad.id);
//                 return Ad.findById(ad.id)
//             })
//             .then(deletedAd => {
//                 expect(deletedAd).to.be.null;
//             });
//     });

//     it('fails on non-existing user', () => {
//         let errorThrown;

//         return deleteAd(new ObjectId().toString(), new ObjectId().toString())
//             .catch(error => {
//                 errorThrown = error;
//             })
//             .finally(() => {
//                 expect(errorThrown).to.be.instanceOf(NotFoundError);
//                 expect(errorThrown.message).to.equal('user not found');
//             });
//     });

//     it('fails on non-existing ad', () => {
//         let user;

//         return bcrypt.hash('123123123', 8)
//             .then(hash => User.create({ name: 'Li', surname: 'Nux', email: 'li@nux.com', username: 'linux', password: hash }))
//             .then(createdUser => {
//                 user = createdUser;
//                 return deleteAd(user.id, new ObjectId().toString())
//             })
//             .catch(error => {
//                 errorThrown = error;
//             })
//             .finally(() => {
//                 expect(errorThrown).to.be.instanceOf(NotFoundError);
//                 expect(errorThrown.message).to.equal('ad not found');
//             });
//     });

//     it('fails on trying to delete an ad by a user who is not the author', () => {
//         let user1, user2;
//         let ad;

//         return bcrypt.hash('123123123', 8)
//             .then(hash => User.create({ name: 'Li', surname: 'Nux', email: 'li@nux.com', username: 'linux', password: hash }))
//             .then(createdUser => {
//                 user1 = createdUser;
//                 return bcrypt.hash('456456456', 8)
//             })
//             .then(hash => User.create({ name: 'Jo', surname: 'Doe', email: 'jo@doe.com', username: 'johndoe', password: hash }))
//             .then(createdUser => {
//                 user2 = createdUser;
//                 return Ad.create({ author: user1._id.toString(), title: 'Limones', description: 'Luneros', price: '8.5 €/Kg', date: new Date(), adcomments: [] })
//             })
//             .then(createdAd => {
//                 ad = createdAd;
//                 return deleteAd(user2.id, ad.id)
//             })
//             .catch(error => {
//                 errorThrown = error;
//             })
//             .finally(() => {
//                 expect(errorThrown).to.be.instanceOf(MatchError);
//                 expect(errorThrown.message).to.equal('ad author does not match user & cannot be deleted');
//             });
//     });

//     after(() => Promise.all([Ad.deleteMany(), User.deleteMany()])
//         .then(() => mongoose.disconnect()))
// });
