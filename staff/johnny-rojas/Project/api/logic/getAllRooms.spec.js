import 'dotenv/config'
import mongoose from 'mongoose'
import { User, Room } from '../data/index.js'
import getAllRooms from './getAllRooms.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

const { MONGODB_URL_TEST } = process.env

debugger

describe('getAllRooms', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Room.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Room.deleteMany()]))

  it('succeed when rooms are retrieved successfully', () => {
    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(createdUser => {
        const room1 = {
          nameRoom: 'Room',
          region: 'Norte',
          city: 'City',
          image: 'https://example.com/1-image.png',
          description: 'Old description',
          price: '50 USD',
          author: createdUser.id
        }

        const room2 = {
          nameRoom: 'Room',
          region: 'Sur',
          city: 'City 1',
          image: 'https://example.com/1-image.png',
          description: 'Old description',
          price: '50 USD',
          author: createdUser.id
        }
        return Room.create([room1, room2])
          .then(() => getAllRooms())
          .then(rooms => {
            expect(rooms).to.be.an('array').that.has.lengthOf(2)
        })
      })
  })
  it('succeeds returning empty array on no rooms ', () => {
    return getAllRooms()
      .then(rooms => {
        expect(rooms).to.be.an('array').that.is.empty
      })
  })

  after(() => Promise.all([User.deleteMany(), Room.deleteMany()]).then(() => mongoose.disconnect()))
})