import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { User } from '../data/index.js'
import getArtistsByCity from './getArtistsByCity.js'
import { ContentError } from 'com/errors.js'
import validate from 'com/validate.js'

const { ObjectId } = mongoose.Types
const { MONGODB_URL_TEST } = process.env

describe('getArtistsByCity', function () {
  before(() => {
    return mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany())
  })

  beforeEach(() => {
    return User.deleteMany()
  })

  it('should return a list of artists excluding a specific date', () => {
    const artistsData = [
      {
        name: 'Artist One',
        artisticName: 'Artist1',
        discipline: 'Music',
        city: 'Madrid',
        dates: [new Date('2024-01-01')],
        image: 'http://example.com/image1',
        video: 'http://example.com/video1',
        description: 'Description One',
        role: 'artist',
        email: 'artistone@example.com',
        password: 'password123',
      },
      {
        name: 'Artist Two',
        artisticName: 'Artist2',
        discipline: 'Music',
        city: 'Madrid',
        dates: [new Date('2024-08-14')],
        image: 'http://example.com/image2',
        video: 'http://example.com/video2',
        description: 'Description Two',
        role: 'artist',
        email: 'artisttwo@example.com',
        password: 'password123',
      },
    ]

    return User.insertMany(artistsData)
      .then(() => getArtistsByCity('Music', 'Madrid', '2024-01-01'))
      .then((artists) => {
        expect(artists).to.be.an('array')
        expect(artists).to.have.lengthOf(1)

        const [artist] = artists
        expect(artist.artisticName).to.equal('Artist2')
        expect(artist.dates).to.deep.equal(['14-08-2024'])
      })
  })

  it('should throw a ContentError if discipline is invalid', () => {
    try {
      validate.text('Madrid', 'city')
      validate.text(1234, 'discipline')
      getArtistsByCity(1234, 'Madrid', '2024-01-01')
        .then(() => {
          throw new Error('Expected function to throw')
        })
        .catch((error) => {
          expect(error).to.be.instanceOf(ContentError)
          expect(error.message).to.equal('discipline is not valid')
        })
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.equal('discipline is not valid')
    }
  })

  it('should throw a ContentError if city is invalid', () => {
    try {
      validate.text(1234, 'city')
      getArtistsByCity('Music', 'Madrid', '2024-01-01')
        .then(() => {
          throw new Error('Expected function to throw')
        })
        .catch((error) => {
          expect(error).to.be.instanceOf(ContentError)
          expect(error.message).to.equal('city is not valid')
        })
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.equal('city is not valid')
    }
  })

  it('should throw a ContentError if date is invalid', () => {
    try {
      validate.text('Music', 'discipline')
      validate.text('Madrid', 'city')
      validate.date('invalid-date', 'date')
      getArtistsByCity('Music', 'Madrid', 'invalid-date')
        .then(() => {
          throw new Error('Expected function to throw')
        })
        .catch((error) => {
          expect(error).to.be.instanceOf(ContentError)
          expect(error.message).to.equal('date is not valid')
        })
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.equal('date is not valid')
    }
  })

  after(() => {
    return mongoose.disconnect()
  })
})
