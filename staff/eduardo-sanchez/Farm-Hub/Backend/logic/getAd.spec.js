import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

import { expect } from 'chai';
import { Ad, User } from '../data/index.js';
import getAd from './getAd.js';
import { NotFoundError, SystemError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;
const { ObjectId } = Types;

describe('getAd', () => {
  before(() =>
    mongoose
      .connect(MONGODB_URL_TEST)
      .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
  );

  beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

  it('succeeds on retrieving an existing ad with populated fields', () => {
    return bcrypt.hash('password', 8).then((hash) => {
      return User.create({
        name: 'Li',
        surname: 'Nux',
        email: 'li@nux.com',
        username: 'linux',
        password: hash,
      }).then((user) =>
        Ad.create({
          author: user._id.toString(),
          title: 'Fresh Oranges',
          description: 'Juicy and fresh oranges.',
          price: '5 €/Kg',
          date: new Date(),
          adcomments: [
            {
              author: user._id.toString(),
              comment: 'Great price!',
              date: new Date(),
            },
          ],
        })
          .then((ad) => getAd(ad.id.toString()))
          .then((ad) => {
            // console.log('ad', ad)
            console.log('ad', JSON.stringify(ad, null, 2));
            expect(ad).to.be.an('object');
            expect(ad.title).to.equal('Fresh Oranges');
            expect(ad.description).to.equal('Juicy and fresh oranges.');
            expect(ad.price).to.equal('5 €/Kg');
            expect(ad.author.username).to.equal('linux');
            expect(ad.adcomments[0].author.username).to.equal('linux');
            expect(ad.adcomments[0].comment).to.equal('Great price!');
            expect(ad.adcomments).to.be.an('array');
            ;

          })
      );
    });
  });

  it('fails on non-existing ad', () => {
    let errorThrown;

    return getAd(new ObjectId().toString())
      .catch((error) => (errorThrown = error))
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError);
        expect(errorThrown.message).to.equal('ad not found');
      });
  });

  after(() =>
    Ad.deleteMany()
      .then(() => User.deleteMany())
      .then(() => mongoose.disconnect())
  );
});

/*

import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { expect } from 'chai';
import { Ad, User } from '../data/index.js';
import getAd from './getAd.js';
import { NotFoundError, SystemError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;
const { ObjectId } = Types;

describe('getAd', () => {
  before(() =>
    mongoose
      .connect(MONGODB_URL_TEST)
      .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
  );

  beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

  it('succeeds on retrieving an existing ad with populated fields', () => {
    return bcrypt.hash('password', 8).then((hash) => {
      return User.create({
        name: 'Li',
        surname: 'Nux',
        email: 'li@nux.com',
        username: 'linux',
        password: hash,
      }).then((user) =>
        Ad.create({
          author: user._id.toString(),
          title: 'Fresh Oranges',
          description: 'Juicy and fresh oranges.',
          price: '5 €/Kg',
          date: new Date(),
          adcomments: [
            {
              author: user._id.toString(),
              comment: 'Great price!',
              date: new Date(),
            },
          ],
        })
          .then((ad) => getAd(ad.id))
          .then((ad) => {
            expect(ad).to.be.an('object');
            expect(ad.title).to.equal('Fresh Oranges');
            expect(ad.description).to.equal('Juicy and fresh oranges.');
            expect(ad.price).to.equal('5 €/Kg');
            expect(ad.author).to.equal('linux');
            expect(ad.adcomments[0].author).to.equal('linux');
            expect(ad.adcomments[0].comment).to.equal('Great price!'); // Changed to match creation
            expect(ad.adcomments).to.be.an('array');
          })
      );
    });
  });

  it('fails on non-existing ad', () => {
    let errorThrown;

    return getAd(new ObjectId().toString())
      .catch((error) => (errorThrown = error))
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError);
        expect(errorThrown.message).to.equal('ad not found');
      });
  });

  after(() =>
    Ad.deleteMany()
      .then(() => User.deleteMany())
      .then(() => mongoose.disconnect())
  );
});

*/

// import 'dotenv/config'
// import mongoose, { Types } from 'mongoose'
// import { expect } from 'chai'
// import { Ad, User } from '../data/index.js'
// import getAd from './getAd.js'
// import { NotFoundError, SystemError } from 'com/errors.js'

// const { MONGODB_URL_TEST } = process.env
// const { ObjectId } = Types

// describe('getAd', () => {
//   before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Ad.deleteMany()])))

//   beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))

//   it('succeeds on retrieving an existing ad with populated fields', () => {
//     let createdAd

//     return User.create({ name: 'John', surname: 'Doe', email: 'john@doe.com', username: 'johndoe', password: 'hashedPassword' })
//       .then(user =>
//         Ad.create({
//           author: user._id.toString(),
//           title: 'Fresh Oranges',
//           description: 'Juicy and fresh oranges.',
//           price: '5 €/Kg',
//           date: new Date(),
//           adcomments: [{ author: user._id.toString(), comment: 'Great deal!', date: new Date() }]
//         })
//           .then(ad => {
//             createdAd = ad
//             return getAd(ad.id)
//           })
//           .then(ad => {
//             expect(ad).to.be.an('object')
//             expect(ad._id.toString()).to.equal(createdAd._id.toString())
//             expect(ad.author.username).to.equal('johndoe')
//             expect(ad.adcomments[0].author.username).to.equal('johndoe')
//             expect(ad.adcomments[0].comment).to.equal('Great deall!')
//           })
//       )
//   })

//   it('fails on non-existing ad', () => {
//     let errorThrown

//     return getAd(new ObjectId().toString())
//       .catch(error => errorThrown = error)
//       .finally(() => {
//         expect(errorThrown).to.be.instanceOf(NotFoundError)
//         expect(errorThrown.message).to.equal('ad not found')
//       })
//   })

//   after(() => Ad.deleteMany().then(() => User.deleteMany()).then(() => mongoose.disconnect()))
// })
