import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/index.js'
import deleteDate from '../logic/deleteDate.js'
import { ContentError, SystemError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('deleteDate', () => {
  before(() => {
    return mongoose
      .connect(MONGODB_URL_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => User.deleteMany())
  })

  beforeEach(() => User.deleteMany())

  it("should successfully remove a date from the user's dates array", (done) => {
    const artistData = {
      name: 'Artist Name',
      artisticName: 'ArtistName',
      email: 'artist@example.com',
      city: 'New York',
      discipline: 'Painter',
      description: 'Experienced painter',
      image: 'https://example.com/image.jpg',
      video: 'https://example.com/video.mp4',
      dates: ['2024-08-01T00:00:00.000Z', '2024-08-02T00:00:00.000Z'],
      password: 'password123',
      role: 'artist',
    }

    User.create(artistData).then((user) => {
      const artistId = user._id.toString()
      const dateToRemove = '2024-08-01T00:00:00.000Z'

      return deleteDate(artistId, dateToRemove)
        .then((updatedUser) => {
          expect(updatedUser.dates).to.not.include(dateToRemove)
          expect(updatedUser.dates).to.have.lengthOf(1) // Only one date should remain
          done()
        })
        .catch(done) // Ensure to pass errors to done
    })
  })

  it('should fail if the artist does not exist', (done) => {
    const invalidArtistId = new ObjectId().toString()
    const dateToRemove = '2024-08-01T00:00:00.000Z'

    deleteDate(invalidArtistId, dateToRemove)
      .then(() => {
        done(new Error('Expected error not thrown'))
      })
      .catch((error) => {
        expect(error).to.be.instanceOf(SystemError)
        expect(error.message).to.equal('Artist not found')
        done()
      })
  })

  it('should handle invalid date format', (done) => {
    const artistData = {
      name: 'Artist Name',
      artisticName: 'ArtistName',
      email: 'artist@example.com',
      city: 'New York',
      discipline: 'Painter',
      description: 'Experienced painter',
      image: 'https://example.com/image.jpg',
      video: 'https://example.com/video.mp4',
      dates: ['2024-08-01T00:00:00.000Z'],
      password: 'password123',
      role: 'artist',
    }

    User.create(artistData).then((user) => {
      const artistId = user._id.toString()
      const invalidDate = 'invalid-date-format'

      try {
        deleteDate(artistId, invalidDate)
          .then(() => {
            done(new Error('Expected error not thrown'))
          })
          .catch((error) => {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.include('date is not valid')
            done()
          })
      } catch (error) {
        expect(error).to.be.instanceOf(ContentError)
        expect(error.message).to.include('date is not valid')
        done()
      }
    })
  })

  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
