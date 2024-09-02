import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import registerClient from './registerClient.js'
import {
  ContentError,
  CredentialsError,
  DuplicityError,
  MatchError,
} from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('registerClient', () => {
  before(() => {
    return mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany())
  })

  beforeEach(() => {
    return User.deleteMany()
  })

  it('succeeds on new user', () => {
    return registerClient('David', 'david@bisbal.com', '123123123', '123123123')
      .then(() => User.findOne())
      .then((user) => {
        expect(user.name).to.equal('David')
        expect(user.email).to.equal('david@bisbal.com')

        return bcrypt.compare('123123123', user.password)
      })
      .then((match) => {
        expect(match).to.be.true
      })
  })

  it('fails on existing user', () => {
    let errorThrown

    return bcrypt
      .hash('1234', 8)
      .then((hash) =>
        User.create({
          name: 'David',
          email: 'david@bisbal.com',
          role: 'client',
          password: hash,
        })
      )
      .then(() =>
        registerClient('David', 'david@bisbal.com', '123123123', '123123123')
      )
      .catch((error) => {
        errorThrown = error
        return Promise.resolve()
      })
      .then(() => {
        expect(errorThrown).to.be.instanceOf(DuplicityError)
        expect(errorThrown.message).to.equal('User already exists')
      })
  })

  it('fails on invalid name', () => {
    let errorThrown

    try {
      registerClient(1234, 'david@bisbal.com', '123123123', '123123123')
    } catch (error) {
      errorThrown = error
    }

    return Promise.resolve().then(() => {
      expect(errorThrown).to.be.instanceOf(CredentialsError)
      expect(errorThrown.message).to.equal('name is not valid')
    })
  })

  it('fails on invalid email', () => {
    let errorThrown

    try {
      registerClient('David', 'invalid-email', '123123123', '123123123')
    } catch (error) {
      errorThrown = error
    }

    return Promise.resolve().then(() => {
      expect(errorThrown).to.be.instanceOf(CredentialsError)
      expect(errorThrown.message).to.equal('email is not valid')
    })
  })

  it('fails on invalid password', () => {
    let errorThrown

    try {
      registerClient('David', 'david@bisbal.com', 123123123, '123123123')
    } catch (error) {
      errorThrown = error
    }

    return Promise.resolve().then(() => {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('password is not valid')
    })
  })

  it('fails on non matching password repeat', () => {
    let errorThrown

    try {
      registerClient(
        'David',
        'david@bisbal.com',
        '123123123',
        'differentpassword'
      )
    } catch (error) {
      errorThrown = error
    }

    return Promise.resolve().then(() => {
      expect(errorThrown).to.be.instanceOf(MatchError)
      expect(errorThrown.message).to.equal("passwords don't match")
    })
  })

  after(() => {
    return User.deleteMany().then(() => mongoose.disconnect())
  })
})
