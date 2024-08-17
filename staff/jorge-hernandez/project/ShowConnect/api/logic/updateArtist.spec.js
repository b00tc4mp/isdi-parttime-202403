import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import { User } from '../data/index.js'
import updateArtist from './updateArtist.js'
import { SystemError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('updateArtist', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it('should update artist details and save successfully', () => {
    const userData = {
      name: 'Test User',
      artisticName: 'Old Name',
      images: 'http://example.com/image',
      description: 'Old description',
      dates: ['2024-01-01'],
      video: 'http://example.com/video',
      password: '123',
      email: 'test@example.com',
      role: 'artist',
      city: 'Madrid',
      discipline: 'Music',
    }

    return User.create(userData).then((user) => {
      const userId = user._id
      const updateData = {
        artisticName: 'New Name',
        images: 'https://example.com/new-image',
        description: 'New description',
        dates: ['2024-08-14'],
      }

      return updateArtist(userId, updateData).then((updatedUser) => {
        expect(updatedUser.artisticName).to.equal('New Name')
        expect(updatedUser.images).to.equal('https://example.com/new-image')
        expect(updatedUser.description).to.equal('New description')
        expect(updatedUser.dates).to.deep.equal(['2024-08-14'])
      })
    })
  })

  it('should throw an error if artist is not found', () => {
    const nonExistingUserId = new mongoose.Types.ObjectId().toString()

    return updateArtist(nonExistingUserId, {})
      .then(() => {
        throw new Error('Expected function to throw')
      })
      .catch((error) => {
        expect(error).to.be.instanceOf(SystemError)
        expect(error.message).to.equal('Artist not found')
      })
  })

  it('should handle invalid userId format', () => {
    return updateArtist('invalidUserId', {})
      .then(() => {
        throw new Error('Expected function to throw')
      })
      .catch((error) => {
        expect(error).to.be.instanceOf(SystemError)
        expect(error.message).to.include('Cast to ObjectId failed') // Check for Mongoose specific error message
      })
  })

  after(() => mongoose.disconnect())
})
