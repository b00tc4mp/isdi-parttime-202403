import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import getUserName from './getUserName.js'
import { User } from '../data/index.js'
import { NotFoundError, ContentError } from 'com/errors.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

debugger

describe('getUserName', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
  beforeEach(() => User.deleteMany())

  it('succeeds getting userName for existing user', () => {
    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Chai',
        surname: 'Mocha',
        email: 'Chai@Mocha.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(() => User.findOne())
      .then(user => {
        expect(user.name).to.be.a.string
        expect(user.name).to.be.equal('Chai')
        expect(user.surname).to.be.equal('Mocha')
        expect(user.email).to.be.equal('Chai@Mocha.com')
        expect(user.phone).to.be.equal('+58 414 455 7362')
      })
  })

  it('fails on non-existing user', () => {
    let errorThrown

    return getUserName(new ObjectId().toString())
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
    })
  })

  it('fails on invalid userId', () => {
    let errorThrown

    try {
      getUserName(8969)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
    }
  })

  after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()))
})