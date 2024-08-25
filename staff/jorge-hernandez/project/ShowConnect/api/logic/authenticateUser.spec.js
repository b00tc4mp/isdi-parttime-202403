import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import authenticateUser from './authenticateUser.js'
import { CredentialsError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('authenticateUser', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it('succeeds on existing user with correct password', () => {
    return bcrypt
      .hash('123', 8)
      .then((hash) =>
        User.create({
          name: 'Jorge',
          artisticName: 'Jorge Moreno',
          discipline: 'mago',
          city: 'madrid',
          description: 'description',
          email: 'jorge@moreno.com',
          image: 'http',
          video: 'http',
          password: hash,
        })
      )
      .then(() => authenticateUser('jorge@moreno.com', '123'))
      .then(({ userId, role }) => {
        expect(userId).to.be.a('string')
        expect(userId).to.have.lengthOf(24)
        expect(role).to.be.a('string')
      })
  })

  it('fails on non-existing user', () => {
    return authenticateUser('test@test.com', '123').catch((error) => {
      expect(error).to.be.instanceOf(CredentialsError)
      expect(error.message).to.equal('user not found')
    })
  })

  it('fails on existing user with wrong password', () => {
    return bcrypt
      .hash('correctpassword', 8)
      .then((hash) =>
        User.create({
          name: 'Jorge',
          artisticName: 'Jorge Moreno',
          discipline: 'mago',
          city: 'madrid',
          description: 'description',
          email: 'jorge@moreno.com',
          image: 'http',
          video: 'http',
          password: hash,
        })
      )
      .then(() => authenticateUser('jorge@moreno.com', 'wrongpassword'))
      .catch((error) => {
        expect(error).to.be.instanceOf(CredentialsError)
        expect(error.message).to.equal('wrong password')
      })
  })

  it('fails on invalid email format', () => {
    let errorThrown

    try {
      authenticateUser(1234567890, '123')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(CredentialsError)
      expect(errorThrown.message).to.equal('email is not valid')
    }
  })

  it('fails on invalid password format', () => {
    let errorThrown

    try {
      authenticateUser('jorge@moreno.com', 123)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('password is not valid')
    }
  })

  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
