import 'dotenv/config'
import mongoose from 'mongoose'
import { User, Room, Booking } from '../data/index.js'
import getAllBookings from './getAllBookings.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

const { MONGODB_URL_TEST } = process.env

debugger

describe('getAllBookings', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Booking.deleteMany()))

  beforeEach(() => Booking.deleteMany())

  it('succeeds when bookings are retrieved successfully', () => {
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
          startDate: new Date(),
          endDate: new Date(new Date().setDate(new Date().getDate() + 1))
        })
      })
      .then(() => {
        return Booking.create({
          user: user2.id.toString(),
          room: room.id.toString(),
          startDate: new Date(),
          endDate: new Date(new Date().setDate(new Date().getDate() + 2))
        })
      })
      .then(() => {
        return getAllBookings()
      })
      .then(bookings => {
        expect(bookings).to.be.an('array').that.has.lengthOf(2)
        expect(bookings[0].user.toString()).to.equal(user2.id.toString())
        expect(bookings[0].room.toString()).to.equal(room.id.toString())
        expect(bookings[1].user.toString()).to.equal(user2.id.toString())
        expect(bookings[1].room.toString()).to.equal(room.id.toString())
      })
  })

  it('succeeds returning empty array on no bookings', () => {
    return getAllBookings()
      .then(bookings => {
        expect(bookings).to.be.an('array').that.is.empty
      })
  })

  after(() => Booking.deleteMany().then(() => mongoose.disconnect()))
})