import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/index.js'
import deleteDate from './deleteDate.js'
import { ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('deleteDate', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it("should successfully remove a date from the user's dates array", () => {
    const artistData = {
      name: 'Jorge',
      artisticName: 'Jorge',
      email: 'jorge@ge.com',
      city: 'madrid',
      discipline: 'mago',
      description: 'magia',
      image: 'https:',
      video: 'https:',
      dates: ['2024-08-01T00:00:00.000Z', '2024-08-02T00:00:00.000Z'],
      password: 'password123',
      role: 'artist',
    }

    return User.create(artistData).then((user) => {
      const artistId = user._id.toString()
      const dateToRemove = '2024-08-01T00:00:00.000Z'

      return deleteDate(artistId, dateToRemove).then((updatedUser) => {
        expect(updatedUser.dates).to.not.include(dateToRemove)
        expect(updatedUser.dates).to.have.lengthOf(1)
      })
    })
  })

  it('should handle invalid date format', () => {
    const artistData = {
      name: 'Jorge',
      artisticName: 'Jorge',
      email: 'jorge@ge.com',
      city: 'madrid',
      discipline: 'mago',
      description: 'magia',
      image: 'https:',
      video: 'https:',
      dates: ['2024-08-01T00:00:00.000Z'],
      password: 'password123',
      role: 'artist',
    }

    return User.create(artistData).then((user) => {
      const artistId = user._id.toString()
      const invalidDate = 'invalidDate'

      let errorThrown

      try {
        deleteDate(artistId, invalidDate).catch((error) => {
          errorThrown = error
        })
      } catch (error) {
        errorThrown = error
      } finally {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('date is not valid')
      }
    })
  })

  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
