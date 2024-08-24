import { expect } from 'chai'
import mongoose from 'mongoose'
import 'dotenv/config'
import { User } from '../data/index.js'
import getArtistsByCity from '../logic/getArtistsByCity.js'
import { SystemError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('getArtistsByCity', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it('should return artists by city and discipline, excluding specific dates', () =>
    User.create([
      {
        name: 'Artist One',
        artisticName: 'Artist One',
        email: 'artist1@example.com',
        city: 'madrid',
        discipline: 'musico',
        role: 'artist',
        dates: [new Date('2024-08-02')],
        image: 'https',
        description: 'Description',
        video: 'https',
        password: 'password123',
      },
    ])
      .then(() => getArtistsByCity('musico', 'madrid', '2024-08-01'))
      .then((result) => {
        expect(result[0]).to.deep.equal({
          id: result[0].id,
          artisticName: 'Artist One',
          city: 'madrid',
          image: 'https',
          discipline: 'musico',
          description: 'Description',
          video: 'https',
          dates: ['2024-08-02T00:00:00.000Z'],
        })
      }))

  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
