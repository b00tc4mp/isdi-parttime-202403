import 'dotenv/config'
import { User, Room, Booking } from '../data/index.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import createBooking from '../logic/createBooking.js'
import { expect } from 'chai'
import { NotFoundError, DuplicityError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

describe('createBooking', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()]))

  it('succeeds on create booking', () => {
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
        return createBooking(user2.id, room.id, new Date(), new Date(new Date().setDate(new Date().getDate() + 1)))
      })
      .then(() => Booking.findOne())
      .then(booking => {
        expect(booking).to.not.be.null
        expect(booking.user.toString()).to.equal(user2.id)
        expect(booking.room.toString()).to.equal(room.id)
        expect(booking.user).to.be.an('object')
        expect(booking.room).to.be.an('object')
        expect(booking.startDate).to.be.an('date')
        expect(booking.endDate).to.be.an('date')
      })
  })

  it('fails manager cannot book their own rooms', () => {

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(user => {
        return Room.create({
          nameRoom: 'Room 1',
          region: 'Norte',
          city: 'City 1',
          image: 'https://example.com/image.png',
          description: 'Nice room',
          price: '100 USD',
          author: user.id,
          manager: user.id
        })
      })
      .then(room => {
        return createBooking(room.manager.toString(), room.id, new Date(), new Date(new Date().setDate(new Date().getDate() + 1)))
      })
      .catch(error => {
        expect(error).to.be.instanceOf(MatchError)
        expect(error.message).to.equal('manager cannot book their own rooms')
      })
  })

  it('fails when dates overlap with existing booking', () => {
    let user, room

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(createdUser => {
        user = createdUser
        return Room.create({
          nameRoom: 'Room 1',
          region: 'Norte',
          city: 'City 1',
          image: 'https://example.com/image.png',
          description: 'Nice room',
          price: '100 USD',
          author: user.id,
          manager: user.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return Booking.create({
          user: user.id,
          room: room.id,
          startDate: new Date(),
          endDate: new Date(new Date().setDate(new Date().getDate() + 2))
        })
      })
      .then(() => {
        return createBooking(user.id, room.id, new Date(), new Date(new Date().setDate(new Date().getDate() + 2)))
          .catch(error => {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal('unavailable dates')
          })
      })
  })

  it('fails when the manager tries to book their own room', () => {
    let user, room

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(createdUser => {
        user = createdUser
        return Room.create({
          nameRoom: 'Room 1',
          region: 'Nortex',
          city: 'City 1',
          image: 'https://example.com/image.png',
          description: 'Nice room',
          price: '100 USD',
          author: user.id,
          manager: user.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return createBooking(user.id, room.id, new Date(), new Date(new Date().setDate(new Date().getDate() + 2)))
          .catch(error => {
            expect(error).to.be.instanceOf(MatchError)
            expect(error.message).to.equal('manager cannot book their own rooms')
          })
      })
  })

  it('fails when room is not found', () => {
    let user

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(createdUser => {
        user = createdUser
        return createBooking(user.id, new ObjectId().toString(), new Date(), new Date(new Date().setDate(new Date().getDate() + 2)))
          .catch(error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('room not found')
          })
      })
  })

  after(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()]).then(() => mongoose.disconnect()))
})