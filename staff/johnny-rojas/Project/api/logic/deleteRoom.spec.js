import 'dotenv/config'
import { User, Room, Booking } from '../data/index.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import deleteRoom from '../logic/deleteRoom.js'
import { expect } from 'chai'
import { MatchError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

describe('deleteRoom', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()]))

  it('succeeds when host delete a room without bookings', () => {
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
          author: user.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return deleteRoom(user.id, room.id)
      })
      .then(() => Room.findById(room.id))
      .then(deletedRoom => {
        expect(deletedRoom).to.be.null
      })
  })

  it('fails when user does not exist', () => {
    let errorThrown

    return Room.create({
      nameRoom: 'Room 1',
      region: 'Norte',
      city: 'City 1',
      image: 'https://example.com/image.png',
      description: 'Nice room',
      price: '100 USD',
      author: new ObjectId()
    })
      .then(room => {
        return deleteRoom(new ObjectId().toString(), room.id)
      })
      .catch(error => {
        errorThrown = error
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })

  it('fails when room does not exist', () => {
    let errorThrown

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(user => {
        return deleteRoom(user.id, new ObjectId().toString())
      })
      .catch(error => {
        errorThrown = error
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('room not found')
      })
  })

  it('fails when user is not the author of the room', () => {
    let user1, user2, room, errorThrown

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(createdUser => {
        user1 = createdUser
        return bcrypt.hash('1234', 8)
      })
      .then(hash => User.create({
        name: 'Chai',
        surname: 'Mocha',
        email: 'chai@mocha.com',
        phone: '+58 414 455 7363',
        password: hash
      }))
      .then(createdUser => {
        user2 = createdUser
        return Room.create({
          author: user1.id,
          nameRoom: 'Room 1',
          region: 'Norte',
          city: 'City 1',
          image: 'https://example.com/image.png',
          description: 'Nice room',
          price: '100 USD',
          manager: user1.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return deleteRoom(user2.id, room.id)
      })
      .catch(error => {
        errorThrown = error
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(MatchError)
        expect(errorThrown.message).to.equal('room author do not match')
      })
  })

  it('fails when trying to delete a room with bookings', () => {
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
        return Booking.create({
          user: user2.id.toString(),
          room: room.id.toString(),
          startDate: new Date(),
          endDate: new Date(new Date().setDate(new Date().getDate() + 1))
        })
      })
      .then(() => {
        return deleteRoom(user1.id, room.id)
      })
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(MatchError)
        expect(errorThrown.message).to.equal('you cannot delete a room with bookings')
      
    })
  })

  after(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()]).then(() => mongoose.disconnect()))

})