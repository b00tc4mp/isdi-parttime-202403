import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import bcrypt from 'bcryptjs'

import getArtistData from './getArtistData.js'
import { User } from '../data/index.js'
import { NotFoundError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

debugger

describe('getArtistData', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it('succeeds get userName from existing user', () =>
    bcrypt
      .hash('1234', 8)
      .then((hash) =>
        Promise.all([
          User.create({
            name: 'Jorge',
            artisticName: 'Jorge Moreno',
            discipline: 'mago',
            city: 'madrid',
            description: 'mago',
            email: 'jorge@moreno.com',
            images: 'https',
            video: 'https',
            password: hash,
          }),
          User.create({
            name: 'David',
            artisticName: 'David Copperfield',
            discipline: 'mag0',
            city: 'madrid',
            description: 'mago',
            email: 'david@copperfield.com',
            images: 'https',
            video: 'https',
            password: hash,
          }),
        ])
      )
      .then(([user, targetUser]) => getArtistData(user.id, targetUser.id))
      .then((artisticName) => {
        expect(artisticName).to.be.a.string
        expect(artisticName).to.be.equal('David Copperfield')
      }))

  it('fails on non-existing user', () => {
    let errorThrown

    return bcrypt
      .hash('123', 8)
      .then((hash) =>
        User.create({
          name: 'Jorge',
          artisticName: 'Jorge Moreno',
          discipline: 'mago',
          city: 'madrid',
          description: 'mago',
          email: 'jorge@moreno.com',
          images: 'https',
          video: 'htpps',
          password: hash,
        })
      )
      .then((targetUserId) =>
        getArtistData(new ObjectId().toString(), targetUserId.id)
      )
      .catch((error) => (errorThrown = error))
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('User not found')
      })
  })

  it('fails on non-existing targetUser', () => {
    let errorThrown

    return bcrypt
      .hash('123', 8)
      .then((hash) =>
        User.create({
          name: 'Jorge',
          artisticName: 'Jorge Moreno',
          discipline: 'mago',
          city: 'madrid',
          description: 'mago',
          email: 'jorge@moreno.com',
          images: 'https',
          video: 'https',
          password: hash,
        })
      )
      .then((user) => getArtistData(user.id, new ObjectId().toString()))
      .catch((error) => (errorThrown = error))
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('targetUser not found')
      })
  })

  it('fails on invalid userId', () => {
    let errorThrown

    try {
      getArtistData(12345, new ObjectId().toString())
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
    }
  })

  it('fails on invalid targetUserId', () => {
    let errorThrown

    try {
      getArtistData(new ObjectId().toString(), 12345)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('targetUserId is not valid')
    }
  })

  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
