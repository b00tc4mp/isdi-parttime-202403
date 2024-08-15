import 'dotenv/config'
import { User, Room } from '../data/index.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import editRoom from '../logic/editRoom.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import { expect } from 'chai'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

describe('editRoom', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Room.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Room.deleteMany()]))

  it('succeeds when room is updated successfully', () => {
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
          nameRoom: 'Old Room',
          region: 'Norte',
          city: 'City 1',
          image: 'https://example.com/1-image.png',
          description: 'Old description',
          price: '50 USD',
          author: user.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return editRoom(user.id, room.id, {
          nameRoom: 'New Room',
          region: 'Sur',
          city: 'City 2',
          image: 'https://example.com/2-image.png',
          description: 'New description',
          price: '100 USD'
        })
      })
      .then(updatedRoom => {
        expect(updatedRoom.nameRoom).to.equal('New Room')
        expect(updatedRoom.region).to.equal('Sur')
        expect(updatedRoom.city).to.equal('City 2')
        expect(updatedRoom.image).to.equal('https://example.com/2-image.png')
        expect(updatedRoom.description).to.equal('New description')
        expect(updatedRoom.price).to.equal('100 USD')
      })
  })

  it('fails when the room does not exist', () => {
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
        return editRoom(user.id, new ObjectId().toString(), { nameRoom: 'Updated Room' })
          .catch(error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('room not found')
          })
      })
  })

  it('fails when the user is not the owner of the room', () => {
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

        return editRoom(user.id, new ObjectId().toString(), { nameRoom: 'Updated Room' })
          .catch(error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('room not found')
          })
      })
  })

  after(() => Promise.all([User.deleteMany(), Room.deleteMany()]).then(() => mongoose.disconnect()))
})