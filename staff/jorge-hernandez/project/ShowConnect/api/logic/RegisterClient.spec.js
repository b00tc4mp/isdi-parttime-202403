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
  before((done) => {
    mongoose
      .connect(MONGODB_URL_TEST)
      .then(() => User.deleteMany())
      .then(() => done())
      .catch(done)
  })

  beforeEach((done) => {
    User.deleteMany()
      .then(() => done())
      .catch(done)
  })

  it('succeeds on new user', (done) => {
    registerClient('David', 'david@bisbal.com', '123123123', '123123123')
      .then(() => User.findOne())
      .then((user) => {
        expect(user.name).to.equal('David')
        expect(user.email).to.equal('david@bisbal.com')

        return bcrypt.compare('123123123', user.password)
      })
      .then((match) => {
        expect(match).to.be.true
        done()
      })
      .catch(done)
  })

  it('fails on existing user', (done) => {
    let errorThrown

    bcrypt
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
        return Promise.resolve() // Ensure the Promise chain continues
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(DuplicityError)
        expect(errorThrown.message).to.equal('User already exists')
        done()
      })
  })

  it('fails on invalid name', (done) => {
    try {
      registerClient(1234, 'david@bisbal.com', '123123123', '123123123')
    } catch (error) {
      expect(error).to.be.instanceOf(CredentialsError)
      expect(error.message).to.equal('name is not valid')
      done()
    }
  })

  it('fails on invalid email', (done) => {
    try {
      registerClient('David', 'invalid-email', '123123123', '123123123')
    } catch (error) {
      expect(error).to.be.instanceOf(CredentialsError)
      expect(error.message).to.equal('email is not valid')
      done()
    }
  })

  it('fails on invalid password', (done) => {
    try {
      registerClient('David', 'david@bisbal.com', 123123123, '123123123')
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.equal('password is not valid')
      done()
    }
  })

  it('fails on non-matching password repeat', (done) => {
    try {
      registerClient(
        'David',
        'david@bisbal.com',
        '123123123',
        'differentpassword'
      )
    } catch (error) {
      expect(error).to.be.instanceOf(MatchError)
      expect(error.message).to.equal("passwords don't match")
      done()
    }
  })

  after((done) => {
    User.deleteMany()
      .then(() => mongoose.disconnect())
      .then(() => done())
      .catch(done)
  })
})
