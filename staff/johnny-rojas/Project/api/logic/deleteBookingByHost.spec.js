import 'dotenv/config'
import { User, Room, Booking } from '../data/index.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import deleteBookingByHost from './deleteBookingByHost.js'
import { expect } from 'chai'
import { MatchError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

debugger

describe('deleteBookingByHost', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()]))

  it('succeeds when host deletes a booking', () => {
    let user1, user2, room, bookingId

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
          user: user2.id,
          room: room.id,
          startDate: new Date(),
          endDate: new Date()
        })
      })
      .then(createdBooking => {
        bookingId = createdBooking.id
        return deleteBookingByHost(user1.id, room.id, bookingId)
      })
      .then(deletedBooking => {
        expect(deletedBooking).to.be.null
        return Booking.findById(bookingId)
      })
      .then(deletedBooking => {
        expect(deletedBooking).to.be.null
        expect(user1.id).to.be.equal(user1.id)
      })
  })

  it('fails when user does not exist', () => {
    let user1, user2, room, booking, errorThrown
  
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
          user: user2.id,
          room: room.id,
          startDate: new Date(),
          endDate: new Date()
        })
      })
      .then(createdBooking => {
        booking = createdBooking
        return deleteBookingByHost(new ObjectId().toString(), room.id, booking.id)
      })
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })

  it('fails when room does not exist', () => {
    let user1, user2, room, booking, errorThrown
  
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
          user: user2.id,
          room: room.id,
          startDate: new Date(),
          endDate: new Date()
        })
      })
      .then(createdBooking => {
        booking = createdBooking
        return deleteBookingByHost(user1.id, new ObjectId().toString(), booking.id)
      })
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('room not found')
      })
  })

  it('fails when booking does not exist', () => {
    let user1, user2, room, errorThrown
  
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
        return deleteBookingByHost(user1.id, room.id, new ObjectId().toString())
      })
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('booking not found')
      })
  })

  after(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()]).then(() => mongoose.disconnect()))

})