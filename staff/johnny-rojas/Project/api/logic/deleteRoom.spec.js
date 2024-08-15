import 'dotenv/config'
import { User, Room } from '../data/index.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import deleteRoom from '../logic/deleteRoom.js'
import { expect } from 'chai'
import { MatchError, NotFoundError, SystemError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

describe('deleteRoom', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Room.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Room.deleteMany()]))

  it('succeeds when user is the author of the room', () => {
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
          region: 'North',
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
    let room

    return Room.create({
      nameRoom: 'Room 1',
      region: 'North',
      city: 'City 1',
      image: 'https://example.com/image.png',
      description: 'Nice room',
      price: '100 USD',
      author: new ObjectId()
    })
      .then(createdRoom => {
        room = createdRoom
        return deleteRoom(new ObjectId().toString(), room.id)
          .catch(error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
          })
      })
  })

  it('fails when room does not exist', () => {
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
        return deleteRoom(user.id, new ObjectId().toString())
          .catch(error => {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('room nor found')
          })
      })
  })

  it('fails when user is not the author of the room', () => {
    let user1, user2, room

    return Promise.all([
      bcrypt.hash('1234', 8).then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      })),
      bcrypt.hash('5678', 8).then(hash => User.create({
        name: 'Java',
        surname: 'Bean',
        email: 'java@bean.com',
        phone: '+58 414 455 7363',
        password: hash
      }))
    ])
      .then(([createdUser1, createdUser2]) => {
        user1 = createdUser1
        user2 = createdUser2
        return Room.create({
          nameRoom: 'Room 1',
          region: 'North',
          city: 'City 1',
          image: 'https://example.com/image.png',
          description: 'Nice room',
          price: '100 USD',
          author: user1.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return deleteRoom(user2.id, room.id)
          .catch(error => {
            expect(error).to.be.instanceOf(MatchError)
            expect(error.message).to.equal('room author do not match')
          })
      })
  })

  after(() => Promise.all([User.deleteMany(), Room.deleteMany()]).then(() => mongoose.disconnect()))
})