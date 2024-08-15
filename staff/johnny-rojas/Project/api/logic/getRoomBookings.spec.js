import 'dotenv/config'
import mongoose from 'mongoose'
import { Booking, User, Room } from '../data/index.js'
import getRoomBookings from './getRoomBookings.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

describe('getRoomBookings', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Booking.deleteMany()))

  beforeEach(() => Booking.deleteMany())

  it('succeed when get all the bookins for a room', () => {
    let host, guest, room

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'One',
        email: 'userone@chai.com',
        phone: '+58 414 455 7364',
        password: hash
      }))
      .then(createdUser => {
        host = createdUser
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
        guest = createdUser
        return Room.create({
          nameRoom: 'Room 1',
          region: 'Norte',
          city: 'City',
          image: 'https://example.com/anotherimage.png',
          description: 'Another nice room',
          price: '150 USD',
          author: host.id,
          manager: host.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return Booking.create({
          user: guest.id.toString(),
          room: room.id.toString(),
          startDate: new Date(2024, 8, 10),
          endDate: new Date(2024, 8, 11)
        })
      })
      .then(() => {
        return Booking.create({
          user: guest.id.toString(),
          room: room.id.toString(),
          startDate: new Date(2024, 7, 15),
          endDate: new Date(2024, 7, 16)
        })
      })
      .then(() => getRoomBookings(room.id))
      .then(bookings => {
        expect(bookings).to.be.an('array').length(2)

        expect(bookings[0].user.toString()).to.equal(guest.id.toString())
        expect(bookings[0].room.toString()).to.equal(room.id.toString())
        expect(new Date(bookings[0].startDate)).to.deep.equal(new Date(2024, 8, 10))
        expect(new Date(bookings[0].endDate)).to.deep.equal(new Date(2024, 8, 11))

        expect(bookings[1].user.toString()).to.equal(guest.id.toString())
        expect(bookings[1].room.toString()).to.equal(room.id.toString())
        expect(new Date(bookings[1].startDate)).to.deep.equal(new Date(2024, 7, 15))
        expect(new Date(bookings[1].endDate)).to.deep.equal(new Date(2024, 7, 16))
      })
  })
  it('returns an empty array when there are no bookings for the room', () => {
    return getRoomBookings(new ObjectId().toString())
      .then(bookings => {
        expect(bookings).to.be.an('array').that.is.empty
      })
  })

  after(() => Promise.all([User.deleteMany(), Room.deleteMany()]).then(() => mongoose.disconnect()))
})