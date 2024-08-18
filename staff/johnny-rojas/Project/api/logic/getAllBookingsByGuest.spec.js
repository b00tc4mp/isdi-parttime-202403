import 'dotenv/config'
import mongoose from 'mongoose'
import { User, Room, Booking } from '../data/index.js'
import getAllBookingsByGuest from './getAllBookingsByGuest.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

describe('getAllBookingsByGuest', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()]))

  it('succed when retrieved successfully all de booking by user', () => {
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
        return getAllBookingsByGuest(user2.id)
      })
      .then(bookings => {
        expect(bookings).to.be.an('array').that.has.lengthOf(2)
        expect(bookings[0].user.toString()).to.equal(user2.id.toString())
        expect(bookings[0].room._id.toString()).to.equal(room.id.toString())
        expect(bookings[1].user.toString()).to.equal(user2.id.toString())
        expect(bookings[1].room._id.toString()).to.equal(room.id.toString())
      })
  })
  it('succeeds returning empty array on no bookings', () => {
    let user1, user2

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
      .then(() => {
        return getAllBookingsByGuest(user2.id)
      })
      .then(bookings => {
        expect(bookings).to.be.an('array').that.is.empty
      })
  })

  it('fails on non-existing user', () => {
    let errorThrown

    return getAllBookingsByGuest(new ObjectId().toString())
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })


  after(() => Booking.deleteMany().then(() => mongoose.disconnect()))
})