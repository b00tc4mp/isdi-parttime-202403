import 'dotenv/config'
import { Booking, User, Room } from '../data/index.js'
import mongoose from 'mongoose'
import getBlockedDatesByRoom from './getBlockedDatesByRoom.js'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

debugger

describe('getBlockedDatesByRoom', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Booking.deleteMany()))

  beforeEach(() => Booking.deleteMany())
  it('succeed getting all the blocked dates from a room', () => {
    let user1, user2, room

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'One',
        email: 'userone@chai.com',
        phone: '+58 414 455 7364',
        password: hash
      }))
      .then(createdUser => {
        user1 = createdUser
        return bcrypt.hash('5678', 8)
      })
      .then(hash => User.create({
        name: 'Chai',
        surname: 'Two',
        email: 'usertwo@chai.com',
        phone: '+58 414 455 7365',
        password: hash
      }))
      .then(createdUser => {
        user2 = createdUser
        return Room.create({
          nameRoom: 'Room 1',
          region: 'Norte',
          city: 'City',
          image: 'https://example.com/anotherimage.png',
          description: 'Another nice room',
          price: '150 USD',
          author: user1.id,
          manager: user1.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return Booking.create({
          user: user2.id.toString(),
          room: room.id.toString(),
          startDate: new Date(2024, 8, 10),
          endDate: new Date(2024, 8, 12)
        })
      })
      .then(() => {
        return Booking.create({
          user: user2.id.toString(),
          room: room.id.toString(),
          startDate: new Date(2024, 7, 15),
          endDate: new Date(2024, 7, 16)
        })
      })

      .then(() => {
        return getBlockedDatesByRoom(room.id.toString())
      })
      .then(blockedDates => {
        const actualDates = blockedDates.map(date => new Date(date).toISOString())

        expect(actualDates).to.include(new Date(2024, 8, 10).toISOString())
        expect(actualDates).to.include(new Date(2024, 8, 11).toISOString())
        expect(actualDates).to.include(new Date(2024, 8, 12).toISOString())
        expect(actualDates).to.include(new Date(2024, 7, 15).toISOString())
        expect(actualDates).to.include(new Date(2024, 7, 16).toISOString())

        expect(actualDates).to.have.lengthOf(5)
      })
  })

  it('returns an empty array when there are no bookings for the room', () => {
    return getBlockedDatesByRoom(new ObjectId().toString())
      .then(blockedDates => {
        expect(blockedDates).to.be.an('array').that.is.empty
      })
  })

  after(() => Booking.deleteMany().then(() => mongoose.disconnect()))
})
