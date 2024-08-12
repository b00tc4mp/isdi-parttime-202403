import { expect } from 'chai'
import mongoose, { Types } from 'mongoose'
import { User } from '../data/index.js'
import getArtistData from './getArtistData.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const { ObjectId } = Types

describe('getArtistData', function () {
  before(function () {
    return mongoose
      .connect(process.env.MONGODB_URL_TEST)
      .then(() => User.deleteMany())
  })

  beforeEach(function () {
    return User.deleteMany()
  })

  it('should successfully retrieve artist data for an existing user', function () {
    let user, targetUser

    return User.create({
      name: 'Jorge',
      artisticName: 'Jorge Moreno',
      discipline: 'magician',
      city: 'Madrid',
      description: 'Professional magician',
      email: 'jorge@moreno.com',
      images: 'https://example.com/jorge.png',
      video: 'https://example.com/video.mp4',
      password: 'hashed_password',
    })
      .then((_user) => {
        user = _user
        return User.create({
          name: 'David',
          artisticName: 'David Copperfield',
          discipline: 'magician',
          city: 'Las Vegas',
          description: 'World-famous illusionist',
          email: 'david@copperfield.com',
          images: 'https://example.com/david.png',
          video: 'https://example.com/video_david.mp4',
          password: 'hashed_password',
        })
      })
      .then((_targetUser) => {
        targetUser = _targetUser
        return getArtistData(user._id.toString(), targetUser._id.toString())
      })
      .then((result) => {
        expect(result).to.be.an('object')
        expect(result.artisticName).to.equal('David Copperfield')
        expect(result.description).to.equal('World-famous illusionist')
        expect(result.email).to.equal('david@copperfield.com')
      })
  })

  it('should throw NotFoundError if the user does not exist', function () {
    const invalidUserId = new ObjectId().toString()

    return User.create({
      name: 'David',
      artisticName: 'David Copperfield',
      discipline: 'magician',
      city: 'Las Vegas',
      description: 'World-famous illusionist',
      email: 'david@copperfield.com',
      images: 'https://example.com/david.png',
      video: 'https://example.com/video_david.mp4',
      password: 'hashed_password',
    })
      .then((targetUser) => {
        return getArtistData(invalidUserId, targetUser._id.toString())
      })
      .catch((error) => {
        expect(error).to.be.instanceOf(NotFoundError)
        expect(error.message).to.equal('User not found')
      })
  })

  it('should throw NotFoundError if the targetUser does not exist', function () {
    const invalidTargetUserId = new ObjectId().toString()

    return User.create({
      name: 'Jorge',
      artisticName: 'Jorge Moreno',
      discipline: 'magician',
      city: 'Madrid',
      description: 'Professional magician',
      email: 'jorge@moreno.com',
      images: 'https://example.com/jorge.png',
      video: 'https://example.com/video.mp4',
      password: 'hashed_password',
    })
      .then((user) => {
        return getArtistData(user._id.toString(), invalidTargetUserId)
      })
      .catch((error) => {
        expect(error).to.be.instanceOf(NotFoundError)
        expect(error.message).to.equal('targetUser not found')
      })
  })

  it('should throw SystemError if a system error occurs', function () {
    const validUserId = new ObjectId().toString()

    return mongoose
      .disconnect()
      .then(() => {
        return getArtistData(validUserId, validUserId)
      })
      .catch((error) => {
        expect(error).to.be.instanceOf(SystemError)
      })
      .finally(() => {
        return mongoose.connect(process.env.MONGODB_URL_TEST)
      })
  })

  after(function () {
    return User.deleteMany().then(() => mongoose.disconnect())
  })
})
