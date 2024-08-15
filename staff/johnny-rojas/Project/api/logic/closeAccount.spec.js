import 'dotenv/config'
import { User } from '../data/index.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import closeAccount from '../logic/closeAccount.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

describe('close account', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it('succeeds when user wants to close his account', () => {
    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(() => User.findById(new ObjectId().toString()))
      .then(closeAccount => {
        expect(closeAccount).to.be.null
      })
  })

  it('fails when user does not exist', () => {
    let user, errorThrown

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(createdUser => {
        user = createdUser;
        return closeAccount(new ObjectId().toString())
          .catch(error => errorThrown = error)
          .finally(() => {
            expect(errorThrown).to.be.instanceOf(NotFoundError);
            expect(errorThrown.message).to.equal('user not found');
        })
      });
    
  });
  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})

