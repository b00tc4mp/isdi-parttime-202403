import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

import { expect } from 'chai';
import { Ad, User } from '../data/index.js';
import searchAds from './searchAds.js';
import { SystemError, NotFoundError } from 'com/errors.js';
import { calculateDistance } from '../util/calculateDistance.js';

const { MONGODB_URL_TEST } = process.env;
const { ObjectId } = Types;

describe('searchAds', () => {
    before(() =>
        mongoose.connect(MONGODB_URL_TEST).then(() => Ad.deleteMany())
    );

    beforeEach(() => Ad.deleteMany());

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

    after(() => Ad.deleteMany().then(() => mongoose.disconnect()));
});

///////////////////////////////

// it('fails on non-existing ads', () => {
//     let errorThrown;
//     return bcrypt
//         .hash('password', 8)
//         .then((hash) => {
//             return User.create({
//                 name: 'Li',
//                 surname: 'Nux',
//                 email: 'li@nux.com',
//                 username: 'linux',
//                 password: hash,
//             }).then((user) => {
//                 return Ad.create([
//                     {
//                         author: user._id,
//                         title: 'Tomatoes',
//                         description: ' for salad',
//                         price: '3 €/Kg',
//                         date: new Date(),
//                         contactInfo: '095-095-095',
//                         adcomments: [],
//                         geoLocation: {
//                             lat: 39.40395,
//                             lng: -6.270351,
//                         },
//                     },
//                 ]);
//             });
//         })

//         .then(() =>
//             searchAds('Nonexistent', { lat: 39.40394, lng: -3.270353 }, 50)
//         )
//         .catch((error) => (errorThrown = error))
//         .finally(() => {
//             expect(errorThrown).to.be.instanceOf(NotFoundError);
//             expect(errorThrown.message).to.equal('ads not found');
//         });
// });

/////////////////////////

// it('fails on non-existing ads', () => {
//         let errorThrown;

//     return searchAds('Non-exinting', { lat: 40.891856, lng: -5.76514 }, 50)
//         .catch((error) => (errorThrown = error))
//         .finally(() => {
//             expect(errorThrown).to.be.instanceOf(NotFoundError);
//             expect(errorThrown.message).to.equal('ads not found');
//         });
// });

// it('filters ads by distance when userLocation is provided', () => {
//     return bcrypt
//         .hash('password', 8)
//         .then((hash) => {
//             return User.create({
//                 name: 'Test',
//                 surname: 'User',
//                 email: 'test@user.com',
//                 username: 'testuser',
//                 password: hash,
//             }).then((user) => {
//                 return Ad.create([
//                     {
//                         author: user._id,
//                         title: 'Near Ad',
//                         description: 'This is a near ad',
//                         price: '10 €/Kg',
//                         date: new Date(),
//                         contactInfo: '123-456-789',
//                         adcomments: [],
//                         geoLocation: { lat: 40, lng: -3 },
//                     },
//                     {
//                         author: user._id,
//                         title: 'Far Ad',
//                         description: 'This is a far ad',
//                         price: '15 €/Kg',
//                         date: new Date(),
//                         contactInfo: '987-654-321',
//                         adcomments: [],
//                         geoLocation: { lat: 41, lng: -4 },
//                     },
//                 ]);
//             });
//         })
//         .then(() => searchAds('Ad', { lat: 40, lng: -3 }, 50))
//         .then((ads) => {
//             expect(ads).to.be.an('array');
//             expect(ads).to.have.lengthOf(1);
//             expect(ads[0]).to.have.property('title', 'Near Ad');
//         });
// });

// it('filters ads by distance when userLocation is provided', () => {
//     return Ad.create([
//         {
//             title: 'Near Ad',
//             author: 'user1',
//             geoLocation: { lat: 40, lng: -3 },
//         },
//         {
//             title: 'Far Ad',
//             author: 'user2',
//             geoLocation: { lat: 41, lng: -4 },
//         },
//     ])
//         .then(() => {
//             const userLocation = { lat: 40, lng: -3 };
//             return searchAds('Ad', userLocation, 50);
//         })
//         .then((ads) => {
//             expect(ads).to.be.an('array');
//             expect(ads).to.have.lengthOf(1);
//             expect(ads[0]).to.have.property('title', 'Near Ad');
//         });
// });

// it('excludes ads without geoLocation when filtering by distance', () => {
//     return Ad.create([
//         {
//             title: 'Ad with location',
//             author: 'user1',
//             geoLocation: { lat: 40, lng: -3 },
//         },
//         { title: 'Ad without location', author: 'user2' },
//     ])
//         .then(() => {
//             const userLocation = { lat: 40, lng: -3 };
//             return searchAds('Ad', userLocation, 50);
//         })
//         .then((ads) => {
//             expect(ads).to.be.an('array');
//             expect(ads).to.have.lengthOf(1);
//             expect(ads[0]).to.have.property('title', 'Ad with location');
//         });
// });

// it('returns all ads when userLocation is not provided', () => {
//     return Ad.create([
//         {
//             title: 'Ad 1',
//             author: 'user1',
//             geoLocation: { lat: 40, lng: -3 },
//         },
//         {
//             title: 'Ad 2',
//             author: 'user2',
//             geoLocation: { lat: 41, lng: -4 },
//         },
//     ])
//         .then(() => searchAds('Ad'))
//         .then((ads) => {
//             expect(ads).to.be.an('array');
//             expect(ads).to.have.lengthOf(2);
//         });
// });

it('excludes ads without geoLocation when filtering by distance', () => {
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
                    description: 'Red & Purple',
                    price: '2 €/Kg',
                    date: new Date(),
                    contactInfo: '092-092-092',
                    adcomments: [],
                    geoLocation: { lat, lng },
                });
            });
        })

        .then(() => {
            searchAds('Tomatoes', { lat: 40, lng: -3 }, 50);
            // const userLocation = { lat: 40, lng: -3 };
            // return searchAds('Ad', userLocation, 50);
        })
        .catch((error) => (errorThrown = error))
        .finally(() => {
            expect(errorThrown).to.be.instanceOf(NotFoundError);
            expect(errorThrown.message).to.equal('ads not found');
        });
});

// it('excludes ads without geoLocation when filtering by distance', () => {
//     return Ad.create([
//         {
//             title: 'Ad with location',
//             author: 'user1',
//             geoLocation: { lat: 40, lng: -3 },
//         },
//         { title: 'Ad without location', author: 'user2' },
//     ])
//         .then(() => {
//             const userLocation = { lat: 40, lng: -3 };
//             return searchAds('Ad', userLocation, 50);
//         })
//         .then((ads) => {
//             expect(ads).to.be.an('array');
//             expect(ads).to.have.lengthOf(1);
//             expect(ads[0]).to.have.property('title', 'Ad with location');
//         });
// });

it('filters ads by distance when userLocation is provided', () => {
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
            searchAds('Tomatoes', { lat: 39.40394, lng: -6.270353 }, 50)
        )

        .then((ads) => {
            expect(ads).to.be.an('array');
            expect(ads).to.have.lengthOf(1);
            expect(ads[0]).to.have.property('title', 'Fresh Tomatoes');
        });
});
