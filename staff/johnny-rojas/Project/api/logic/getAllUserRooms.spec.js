import 'dotenv/config'
import mongoose from 'mongoose'
import { User, Room } from '../data/index.js'
import getAllUserRooms from './getAllUserRooms.js'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'
import { NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

debugger

describe('getAllUserRooms', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Room.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Room.deleteMany()]))

  it('succeed when get all rooms by user', () => {
    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(user => {
        const room1 = {
          nameRoom: 'Room',
          region: 'Norte',
          city: 'City',
          image: 'https://example.com/1-image.png',
          description: 'Old description',
          price: '50 USD',
          author: user.id,
          manager: user.id
        }

        const room2 = {
          nameRoom: 'Room',
          region: 'Sur',
          city: 'City 1',
          image: 'https://example.com/1-image.png',
          description: 'Old description',
          price: '50 USD',
          author: user.id,
          manager: user.id
        }
        return Room.create([room1, room2])
          .then(() => getAllUserRooms(user.id))
          .then(rooms => {
            expect(rooms).to.be.an('array').that.has.lengthOf(2)
            expect(rooms[0].author.toString()).to.equal(user.id.toString())
            expect(rooms[1].author.toString()).to.equal(user.id.toString())
          })
      })
  })

  it('succeeds returning an empty array when user has no rooms', () => {
    return bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(user => {
        return getAllUserRooms(user.id)
      })
      .then(rooms => {
        expect(rooms).to.be.an('array').that.is.empty
      })
  })

  it('fails on non-existing user', () => {
    let errorThrown

    return getAllUserRooms(new ObjectId().toString())
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })

  after(() => Promise.all([User.deleteMany(), Room.deleteMany()]).then(() => mongoose.disconnect()))
})


