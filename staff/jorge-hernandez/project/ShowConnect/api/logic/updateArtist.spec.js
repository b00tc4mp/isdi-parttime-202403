import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import { User } from '../data/index.js'
import updateArtist from './updateArtist.js'
import { SystemError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('updateArtist', () => {
  before(() => {
    return mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany())
  })

  beforeEach(() => User.deleteMany())

  it('should update artist details and save successfully', () => {
    const userData = {
      name: 'Test User',
      artisticName: 'Old Name',
      images: 'http',
      description: 'Old description',
      dates: ['2024-01-01'],
      password: '123',
      email: 'test@example.com',
    }

    return User.create(userData).then((user) => {
      const userId = user._id
      const updateData = {
        artisticName: 'New Name',
        images: 'https',
        description: 'New description',
        dates: ['2024-08-14'],
      }

      return updateArtist(userId, updateData).then((updatedUser) => {
        expect(updatedUser.artisticName).to.equal('New Name')
        expect(updatedUser.images).to.deep.equal('https')
        expect(updatedUser.description).to.equal('New description')
        expect(updatedUser.dates).to.deep.equal(['2024-08-14'])
      })
    })
  })

  it('should throw an error if artist is not found', () => {
    return updateArtist('60c72b2f9b1e8c6a9188a7e1', {})
      .then(() => {
        throw new Error('Expected function to throw')
      })
      .catch((error) => {
        expect(error).to.be.instanceOf(SystemError)
        expect(error.message).to.equal('Server error while updating artist')
      })
  })

  it('should handle errors thrown during save', () => {
    const userData = {
      name: 'Test User',
      artisticName: 'Old Name',
      images: 'http',
      description: 'Old description',
      dates: ['2024-01-01'],
      password: '123',
      email: 'test@example.com',
    }

    return User.create(userData).then((user) => {
      // Mocking save to throw an error
      User.prototype.save = () => Promise.reject(new Error('Save error'))

      return updateArtist(user._id, { artisticName: 'New Name' })
        .then(() => {
          throw new Error('Expected function to throw')
        })
        .catch((error) => {
          expect(error).to.be.instanceOf(SystemError)
          expect(error.message).to.equal('Server error while updating artist')
        })
        .finally(() => {
          User.prototype.save = () => Promise.resolve()
        })
    })
  })

  it('should handle invalid userId format', () => {
    return updateArtist('invalidUserId', {})
      .then(() => {
        throw new Error('Expected function to throw')
      })
      .catch((error) => {
        expect(error).to.be.instanceOf(SystemError)
        expect(error.message).to.equal('Server error while updating artist')
      })
  })

  after(() => mongoose.disconnect())
})
