import 'dotenv/config'
import { User } from '../data/index.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import editUserContact from './editUserContact.js'
import { ContentError, NotFoundError } from 'com/errors.js'
import { expect } from 'chai'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

debugger

describe('editUserContact', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it('succeeds when user contact info is updated successfully', () => {
    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(user => {
        return editUserContact(user.id, {
          email: 'chai@chai.com',
          phone: '+58 414 000 7362',
        })
      })
      .then(updateContact => {
        expect(updateContact.email).to.equal('chai@chai.com')
        expect(updateContact.phone).to.equal('+58 414 000 7362')
      })
  })

  it('fails on non existing user', () => {
    let errorThrown

    return editUserContact(new ObjectId().toString(), {
      email: 'new@chai.com',
      phone: '+58 414 000 7362',
    })
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })

  it('fails on invalid email', () => {
    let errorThrown

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(user => {
        return editUserContact(user.id, {
          email: 'chaichai.com', 
          phone: '+58 414 000 7362',
        })
      })
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceof(ContentError)
        expect(errorThrown.message).to.equal('email is not valid')
      })
  })

  it('fails on invalid phone', () => {
    let errorThrown

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(user => {
        return editUserContact(user.id, {
          email: 'chai@chai.com',
          phone: ' 414 7362', 
        })
      })
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceof(ContentError)
        expect(errorThrown.message).to.equal('phone number is not valid')
      })
  })

  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})