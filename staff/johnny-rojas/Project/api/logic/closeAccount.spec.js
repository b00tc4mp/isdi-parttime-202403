import 'dotenv/config'
import { User, Room, Booking } from '../data/index.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import closeAccount from '../logic/closeAccount.js'
import { expect } from 'chai'
import { NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

debugger

describe('close account', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()]))

  it('succeeds when user close his account without rooms or bookings', () => {
    let user

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash,
        isBlocked: false
      }))
      .then(createdUser => {
        user = createdUser
        return closeAccount(user.id)
      })
      .then(() => User.findById(user.id))
      .then(deletedUser => {
        expect(deletedUser).to.not.be.null;
        expect(deletedUser.isBlocked).to.be.true;
      })
  })

  it('succeeds when user close his account whit rooms and without bookings', () => {
    let user, room1, room2

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'One',
        email: 'userone@chai.com',
        phone: '+58 414 455 7364',
        password: hash,
        isBlocked: false
      }))
      .then(createdUser => {
        user = createdUser
        return Room.create({
          author: user.id,
          nameRoom: 'Room One',
          region: 'Norte',
          city: 'City One',
          image: 'https://example.com/anotherimage.png',
          description: 'Another nice room',
          price: '150 USD',
          manager: user.id,
          isBlocked: false
        })
      })
      .then(createdRoom => {
        room1 = createdRoom
        return Room.create({
          author: user.id,
          nameRoom: 'Room 2',
          region: 'Sur',
          city: 'City Two',
          image: 'https://example.com/anotherimage.png',
          description: 'Another nice room',
          price: '150 USD',
          manager: user.id,
          isBlocked: false
        })
      })
      .then(createdRoom => {
        room2 = createdRoom
        return closeAccount(user.id)
      })
      .then(() => User.findById(user.id))
      .then(deletedUser => {
        expect(deletedUser).to.not.be.null;
        expect(deletedUser.isBlocked).to.be.true;
      })
      .then(() => Room.find({ manager: user.id }))
      .then(deletedRooms => {
        expect(deletedRooms).to.be.an('array')
        deletedRooms.forEach(room => {
          expect(room.isBlocked).to.be.true
        })
      })
  })

  it('succeeds when user close his account with rooms and bookings', () => {
    let user1, user2, room, booking

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'One',
        email: 'userone@chai.com',
        phone: '+58 414 455 7364',
        password: hash,
        isBlocked: false
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
          manager: user1.id,
          isBlocked: false
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return Booking.create({
          user: user2.id,
          room: room.id,
          startDate: new Date(),
          endDate: new Date(),
          isBlocked: false
        })
      })
      .then(createdBooking => {
        booking = createdBooking
        return closeAccount(user1.id)
      })
      .then(() => User.findById(user1.id))
      .then(deletedUser => {
        expect(deletedUser).to.not.be.null;
        expect(deletedUser.isBlocked).to.be.true;
      })
      .then(() => Room.find({ manager: user1.id }))
      .then(deletedRooms => {
        expect(deletedRooms).to.be.an('array')
        deletedRooms.forEach(room => {
          expect(room.isBlocked).to.be.true
        })
      })
      .then(() => Booking.find({ _id: room._id }))
      .then(deletedBookings => {
        expect(deletedBookings).to.be.an('array')
        deletedBookings.forEach(booking => {
          expect(booking).to.not.be.null
          expect(booking.isBlocked).to.be.true
        })

    })
  })


  it('fails when user does not exist', () => {
    let errorThrown

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(() => {
        return closeAccount(new ObjectId().toString())
          .catch(error => errorThrown = error)
          .finally(() => {
            expect(errorThrown).to.be.instanceOf(NotFoundError);
            expect(errorThrown.message).to.equal('user not found');
          })
      })
  })
  after(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()]))
})



//TODO hacer 3 rooms y 3 bookings que y que expect sea que este en estado isblocked true