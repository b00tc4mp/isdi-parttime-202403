import 'dotenv/config'
import { User } from '../data/index.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import editUserContact from './editUserContact.js'
import { NotFoundError } from 'com/errors.js'
import { expect } from 'chai'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

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

  it('fails when the user is not the owner of the account', () => {
    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(user => {
        return editUserContact(user.id, new ObjectId().toString(), { email: 'updated email' })
          .catch(error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('room not found')
          })
      })
  })
  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})