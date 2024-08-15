import 'dotenv/config'
import mongoose from 'mongoose'
import { Booking } from '../data/index.js'
import getAllBookings from './getAllBookings.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import { expect } from 'chai'

const { MONGODB_URL_TEST } = process.env

describe('getAllBookings', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Booking.deleteMany()))

  beforeEach(() => Booking.deleteMany())

  it('succeeds when bookings are retrieved successfully', () => {
    const booking1 = {
      user: new mongoose.Types.ObjectId(),
      room: new mongoose.Types.ObjectId(),
      startDate: new Date('2024-08-01'),
      endDate: new Date('2024-08-3')
    }

    const booking2 = {
      user: new mongoose.Types.ObjectId(),
      room: new mongoose.Types.ObjectId(),
      startDate: new Date('2024-08-5'),
      endDate: new Date('2024-08-7')
    }

    return Booking.create([booking1, booking2])
      .then(() => getAllBookings())
      .then(bookings => {
        expect(bookings).to.be.an('array').that.has.lengthOf(2)

        const [firstBooking, secondBooking] = bookings

        expect(firstBooking.user.toString()).to.equal(booking1.user.toString())
        expect(firstBooking.room.toString()).to.equal(booking1.room.toString())
        expect(new Date(firstBooking.startDate).toISOString()).to.equal(booking1.startDate.toISOString())
        expect(new Date(firstBooking.endDate).toISOString()).to.equal(booking1.endDate.toISOString())

        expect(secondBooking.user.toString()).to.equal(booking2.user.toString())
        expect(secondBooking.room.toString()).to.equal(booking2.room.toString())
        expect(new Date(secondBooking.startDate).toISOString()).to.equal(booking2.startDate.toISOString())
        expect(new Date(secondBooking.endDate).toISOString()).to.equal(booking2.endDate.toISOString())
      })
  })

  it('succeeds returning empty array on no bookings ', () => {
    return getAllBookings()
      .then(bookings => {
        expect(bookings).to.be.an('array').that.is.empty
      })
  })

  after(() => Booking.deleteMany().then(() => mongoose.disconnect()))
})