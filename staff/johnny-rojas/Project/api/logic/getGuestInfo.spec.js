import 'dotenv/config'
import mongoose from 'mongoose'
import { Booking, User, Room } from '../data/index.js'
import getGuestInfo from './getGuestInfo.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('getGuestInfo', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Booking.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()]))

  it('succeed when get all info for a guest', () => {
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
      .then(booking => getGuestInfo(booking.id, user2.id))
      .then(booking => {
        expect(booking.user.name).to.equal(user2.name)
        expect(booking.user.surname).to.equal(user2.surname)
        expect(booking.user.email).to.equal(user2.email)
        expect(booking.user.phone).to.equal(user2.phone)
      })
  })

  it('fails when info its no the same', () => {
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
      .then(booking => {
        return getGuestInfo('Not Found', new Object().toString())
      }).catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })
  it('fails on invalid userId', () => {
    let errorThrown

    try {
      getGuestInfo('invalid-id', new ObjectId().toString())
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
    }
  })
  after(() => Promise.all([User.deleteMany(), Room.deleteMany(), Booking.deleteMany()]))
})