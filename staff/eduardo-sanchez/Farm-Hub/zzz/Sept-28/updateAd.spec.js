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
//                 '888-888-888'
//             );
//         })
//         .then((updatedAd) => {
//             expect(updatedAd.title).to.equal('BEANS');
//             expect(updatedAd.description).to.equal('RED');
//             expect(updatedAd.price).to.equal('4.5 €/Kg');
//             expect(updatedAd.contactInfo).to.equal('888-888-888');
//         });
// });

// import 'dotenv/config';
// import mongoose, { Types } from 'mongoose';
// import bcrypt from 'bcryptjs';
// import { expect } from 'chai';

// import { User, Ad } from '../data/index.js';
// import updateAd from './updateAd.js';
// import { NotFoundError, ContentError } from 'com/errors.js';

// const { MONGODB_URL_TEST } = process.env;

// const { ObjectId } = Types;

// describe('updateAd', () => {
//     before(() =>
//         mongoose
//             .connect(MONGODB_URL_TEST)
//             .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
//     );

//     beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

//     it('succeeds on updating an existing ad', () => {
//         bcrypt
//             .hash('123123123', 8)
//             .then((hash) =>
//                 User.create({
//                     name: 'Li',
//                     surname: 'Nux',
//                     email: 'li@nux.com',
//                     username: 'linux',
//                     password: hash,
//                 })
//             )
//             .then((user) =>
//                 Ad.create({
//                     author: user.id,
//                     title: 'beans',
//                     description: 'green',
//                     price: '3.5 €/Kg',
//                     date: new Date(),
//                     contactInfo: '777-777-777',
//                     adcomments: [],
//                     geoLocation: { lat: 39.466945, lng: -6.3758094 },
//                 })
//             )

//             .then((ad) => {
//                 // console.log('updateAd', updateAd);
//                 updateAd(ad.id.toString(), user.id.toString(), {
//                     title: 'BEANS',
//                     description: 'RED',
//                     price: '4.5 €/Kg',
//                     contactInfo: '777-777-777',
//                 });
//                 console.log('updateAd', updateAd);
//                 // return updateAd;
//             })

//             .then(() => Ad.findById(ad._id))

//             .then((updated) => {
//                 console.log('updated', updated);
//                 expect(updated.title).to.equal('BEANS');
//                 expect(updated.description).to.equal('RED');
//                 expect(updated.price).to.equal('4.5 €/Kg');
//                 expect(updated.contactInfo).to.equal('777-777-777');
//             });
//     });

//     it('fails when ad does not exist', () => {
//         let errorThrown;

//         return bcrypt
//             .hash('123123123', 8)
//             .then((hash) =>
//                 User.create({
//                     name: 'Li',
//                     surname: 'Nux',
//                     email: 'li@nux.com',
//                     username: 'linux',
//                     password: hash,
//                 })
//             )
//             .then(() => Ad.findById(new ObjectId().toString()))
//             .then((user) =>
//                 updateAd(new ObjectId().toString(), user.id.toString(), {
//                     title: 'BEANS',
//                     description: 'RED',
//                     price: '4.5 €/Kg',
//                     contactInfo: '777-777-777',
//                 })
//             )
//             .catch((error) => (errorThrown = error))
//             .finally(() => {
//                 expect(errorThrown).to.be.instanceOf(NotFoundError);
//                 expect(errorThrown.message).to.equal('ad not found');
//             });
//     });

//     it('fails on non-existing user', () => {
//         let errorThrown;

//         return updateAd(new ObjectId().toString(), new ObjectId().toString(), {
//             title: 'BEANS',
//             description: 'RED',
//             price: '4.5 €/Kg',
//             contactInfo: '777-777-777',
//         })
//             .catch((error) => (errorThrown = error))
//             .finally(() => {
//                 expect(errorThrown).to.be.instanceOf(NotFoundError);
//                 expect(errorThrown.message).to.equal('User not found');
//             });
//     });

//     after(() =>
//         Ad.deleteMany()
//             .then(() => User.deleteMany())
//             .then(() => mongoose.disconnect())
//     );
// });

// it('succeeds on updating customer profile', () =>
//     bcrypt
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
//             Ad.create({
//                 author: user.id,
//                 title: 'beans',
//                 description: 'green',
//                 price: '3.5 €/Kg',
//                 date: new Date(),
//                 contactInfo: '777-777-777',
//                 adcomments: [],
//                 geoLocation: { lat: 39.466945, lng: -6.3758094 },
//             })
//                 .then((ad) => Ad.findById(ad._id))
//                 .then((ad) =>
//                     updateAd(user.id.toString(), ad.id.toString(), {
//                         title: 'BEANS',
//                         description: 'RED',
//                         price: '4.5 €/Kg',
//                         contactInfo: '777-777-888',
//                     }).then((updatedAd) => {
//                         expect(updatedAd.title).to.equal('BEANS');
//                         expect(updatedAd.description).to.equal('RED');
//                         expect(updatedAd.price).to.equal('4.5 €/Kg');
//                         expect(updatedAd.contactInfo).to.equal(
//                             '777-777-888'
//                         );
//                         return updatedAd;
//                     })
//                 )
//         ));

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
                ad.id,
                user._id,
                'BEANS',
                'RED',
                '4.5 €/Kg',
                '777-777-8888'
            );
        })

        .then(() => Ad.findById(ad._id))
        .then((updated) => {
            console.log('updated', updated);
            expect(updated.title).to.equal('BEANS');
            expect(updated.description).to.equal('RED');
            expect(updated.price).to.equal('4.5 €/Kg');
            expect(updated.contactInfo).to.equal('777-777-8888');
        });
});

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
            // console.log('updateAd', updateAd);
            updateAd(ad.id.toString(), user.id.toString(), {
                title: 'BEANS',
                description: 'RED',
                price: '4.5 €/Kg',
                contactInfo: '777-777-777',
            });
            console.log('updateAd', updateAd);
            // return updateAd;
        })

        .then(() => Ad.findById(ad._id))

        .then((updated) => {
            console.log('updated', updated);
            expect(updated.title).to.equal('BEANS');
            expect(updated.description).to.equal('RED');
            expect(updated.price).to.equal('4.5 €/Kg');
            expect(updated.contactInfo).to.equal('777-777-777');
        });
});

it('fails when update operation fails', () => {
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
                author: user.id,
                title: 'beans',
                description: 'green',
                price: '3.5 €/Kg',
                date: new Date(),
                contactInfo: '777-777-777',
                adcomments: [],
                geoLocation: { lat: 39.466945, lng: -6.3758094 },
            })

                .then((ad) =>
                    updateAd(
                        user.id.toString(),
                        ad.id.toString(),
                        'BEANS',
                        'RED',
                        '4.5 €/Kg',
                        '777-777-8888'
                    )
                )

                .then(() => {
                    throw new Error('Should have thrown a SystemError');
                })
                // .then((ad) => {

                .catch((error) => {
                    errorThrown = error;
                })
                .finally(() => {
                    expect(errorThrown).to.be.instanceOf(SystemError);
                    expect(errorThrown.message).to.equal(
                        'Failed to update the ad'
                    );
                })
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
