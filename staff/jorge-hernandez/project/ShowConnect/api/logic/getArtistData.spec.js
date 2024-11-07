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
    let targetUser

    return User.create({
      name: 'David',
      artisticName: 'David Copperfield',
      discipline: 'mago',
      city: 'Madrid',
      description: 'magician',
      email: 'david@copperfield.com',
      image: 'https://example.com/david.png',
      video: 'https://example.com/video_david.mp4',
      password: 'pass',
    })
      .then((user) => {
        targetUser = user
        return getArtistData(targetUser._id.toString())
      })
      .then((result) => {
        expect(result).to.be.an('object')
        expect(result.artisticName).to.equal('David Copperfield')
        expect(result.description).to.equal('magician')
        expect(result.email).to.equal('david@copperfield.com')
      })
  })

  it('should throw NotFoundError if the targetUser does not exist', function () {
    const invalidTargetUserId = new ObjectId().toString()

    return User.create({
      name: 'Jorge',
      artisticName: 'Jorge Moreno',
      discipline: 'mago',
      city: 'Madrid',
      description: 'magia',
      email: 'jorge@moreno.com',
      image: 'https://example.com/jorge.png',
      video: 'https://example.com/video_jorge.mp4',
      password: 'pass',
    })
      .then(() => getArtistData(invalidTargetUserId))
      .catch((error) => {
        expect(error).to.be.instanceOf(NotFoundError)
        expect(error.message).to.equal('user not found')
      })
  })

  it('should throw SystemError if a system error occurs', function () {
    const validTargetUserId = new ObjectId().toString()

    return mongoose
      .disconnect()
      .then(() => getArtistData(validTargetUserId))
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
