import 'dotenv'
import mongoose, { Types } from 'mongoose'

import bcrypt from 'bcryptjs'

import getUserName from '../logic/getUserName.js'
import { User } from '../data/index.js'
import { NotFoundError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

debugger

describe('getUserName', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it('succeeds get userName from existing user', () =>
    bcrypt.hash('1234', 8)
      .then(hash => Promise.all([User.create({
        name: 'Chai',
        surname: 'Mocha',
        email: 'Chai@Mocha.com',
        username: 'Chaimocha',
        password: hash
      }), User.create({
        name: 'Get',
        surname: 'User',
        email: 'get@user.com',
        username: 'getuser',
        password: hash
      })]))
      .then(([user, targetUser]) => getUserName(user.id, targetUser.id))
      .then(name => {
        expect(name).to.be.a.string
        expect(name).to.be.equal('Get')
      })
  )

  it('fails on non-existing user', () => {
    let errorThrown

    return bcrypt.hash('1111', 8)
      .then(hash => User.create({
        name: 'Chai',
        surname: 'Mocha',
        email: 'Chai@Mocha.com',
        username: 'Chaimocha',
        password: hash
      }))
      .then(targetUser => getUserName(new ObjectId().toString(), targetUser.id))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })

  it('fails on non-existing targetUser', () => {
    let errorThrown

    return bcrypt.hash('1111', 8)
      .then(hash => User.create({
        name: 'Get',
        surname: 'User',
        email: 'get@user.com',
        username: 'GetUser',
        password: hash
      }))
      .then(user => getUserName(user.id, new ObjectId().toString()))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('targetUser not found')
      })
  })

  it('fails on invalid userId', () => {
    let errorThrown

    try {
      getUserName(8969, new ObjectId().toString())
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
    }
  })

  it('fails on invalid targetUser', () => {
    let errorThrown

    try {
      getUserName(new ObjectId().toString(), 98675)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('targetUserId is not valid')
    }
  })

  after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()))
})