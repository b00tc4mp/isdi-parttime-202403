import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import { User } from '../data/index.js'
import updateArtist from './updateArtist.js'
import { SystemError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('updateArtist', () => {
  before(() => {
    return mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany())
  })

  beforeEach(() => {
    return User.deleteMany()
  })

  it('should update artist details and save successfully', () => {
    const userData = {
      name: 'Test User',
      artisticName: 'Old Name',
      image: 'http://example.com/image',
      description: 'Old description',
      dates: [new Date('2024-01-01')],
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
        image: 'https://example.com/new-image',
        description: 'New description',
        dates: [new Date('2024-08-14')],
      }

      return updateArtist(userId, updateData).then((updatedUser) => {
        expect(updatedUser).to.be.an('object')
        expect(updatedUser.artisticName).to.equal('New Name')
        expect(updatedUser.image).to.equal('https://example.com/new-image')
        expect(updatedUser.description).to.equal('New description')
        expect(
          updatedUser.dates.map((date) => date.toISOString())
        ).to.deep.equal([new Date('2024-08-14').toISOString()])
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

  after(() => {
    return mongoose.disconnect()
  })
})
