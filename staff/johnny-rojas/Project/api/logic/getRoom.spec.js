import 'dotenv/config'
import mongoose from 'mongoose'
import { User, Room } from '../data/index.js'
import getRoom from './getRoom.js'
import { expect, } from 'chai'
import bcrypt from 'bcryptjs'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

debugger

describe('getRoom', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Room.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Room.deleteMany()]))

  it('succeed when room are retrieved successfully', () => {

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
          author: user.id,
          nameRoom: 'Room',
          region: 'Norte',
          city: 'City',
          image: 'https://example.com/1-image.png',
          description: 'Old description',
          price: '50 USD',
          manager: user.id.toString()
        })
          .then((room) => getRoom(user.id, room.id))
          .then(room => {
            expect(room.author._id.toString()).to.equal(user.id.toString())
            expect(room.nameRoom).to.equal('Room')
            expect(room.region).to.equal('Norte')
            expect(room.city).to.equal('City')
            expect(room.image).to.equal('https://example.com/1-image.png')
            expect(room.description).to.equal('Old description')
            expect(room.price).to.equal('50 USD')
            expect(room.manager.toString()).to.equal(user.id.toString())
          })
      })
  })

  it('fails when user does not exist', () => {
    let errorThrown

    return Room.create({
      nameRoom: 'Room',
      region: 'Norte',
      city: 'City',
      image: 'https://example.com/1-image.png',
      description: 'Old description',
      price: '50 USD',
      author: new ObjectId(),
      manager: new ObjectId()
    })
      .then(createdRoom => {
        return getRoom(new ObjectId().toString(), createdRoom.id)
      })
      .catch(error => errorThrown = error)
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
      .then(createdUser => {
        return getRoom(createdUser.id, new ObjectId().toString())
      })
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('room not found')
      })
  })

  it('fails on invalid userId', () => {
    let errorThrown

    try {
      getRoom(1111, new ObjectId().toString())
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
    }
  })

  it('fails on invalid roomId', () => {
    let errorThrown

    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(createdUser => {
        try {
          getRoom(createdUser.id, 1111)
        } catch (error) {
          errorThrown = error
        } finally {
          expect(errorThrown).to.be.instanceOf(ContentError)
          expect(errorThrown.message).to.equal('roomId is not valid')
        }
      })
  })


  after(() => Promise.all([User.deleteMany(), Room.deleteMany()]).then(() => mongoose.disconnect()))
})