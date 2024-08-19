import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/index.js'

import authenticateUser from './authenticateUser.js'
import { ContentError, CredentialsError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('authenticateUser', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it('succeeds on existing user with correct password', () =>
    bcrypt
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
      }))
  it('fails on non-existing user', () =>
    authenticateUser('test@test.com', '123').catch((error) => {
      expect(error).to.be.instanceOf(CredentialsError)
      expect(error.message).to.equal('user not found')
    }))

  it('fails on existing user by wrong password', () => {
    let errorThrown

    return bcrypt
      .hash('234234234', 8)
      .then((hash) =>
        User.create({
          name: 'Jorge',
          artisticName: 'Jorge Moreno',
          discipline: 'mago',
          city: 'madrid',
          description: 'mago',
          email: 'jorge@moreno.com',
          image: 'https',
          video: 'https',
          password: hash,
        })
      )
      .then(() => authenticateUser('jorge@moreno.com', '12'))
      .catch((error) => (errorThrown = error))
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('password is not valid')
      })
  })

  it('fails on invalid username', () => {
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

  it('fails on invalid password', () => {
    let errorThrown

    try {
      authenticateUser('jorge@moreno.com', '12')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('password is not valid')
    }
  })

  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
