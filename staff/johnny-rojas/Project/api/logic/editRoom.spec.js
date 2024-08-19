import 'dotenv/config'
import { User, Room } from '../data/index.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import editRoom from '../logic/editRoom.js'
import { NotFoundError, ContentError } from 'com/errors.js'
import { expect } from 'chai'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

debugger

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
          author: user.id,
          manager: user.id
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
        return editRoom(user.id, new ObjectId().toString(), { nameRoom: 'Updated Room' })
          .catch(error => errorThrown = error)
          .finally(() => {
            expect(errorThrown).to.be.instanceOf(NotFoundError)
            expect(errorThrown.message).to.equal('room not found')
          })
      })
  })


  it('fails on invalid nameRoom', () => {
    let errorThrown, user, room

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
          author: user.id,
          manager: user.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return editRoom(user.id, room.id, {
          nameRoom: 111,
          region: 'Sur',
          city: 'City 2',
          image: 'https://example.com/2-image.png',
          description: 'New description',
          price: '100 USD'
        })
      })
      .catch((error) => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('nameRoom is not valid')
      })

  })

  it('fails on invalid region', () => {
    let errorThrown, user, room

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
          author: user.id,
          manager: user.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return editRoom(user.id, room.id, {
          nameRoom: 'RoomName',
          region: 111,
          city: 'City 2',
          image: 'https://example.com/2-image.png',
          description: 'New description',
          price: '100 USD'
        })
      })
      .catch((error) => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('region is not valid')
      })

  })

  it('fails on invalid city', () => {
    let errorThrown, user, room

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
          author: user.id,
          manager: user.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return editRoom(user.id, room.id, {
          nameRoom: 'RoomName',
          region: 'sur',
          city: 1111,
          image: 'https://example.com/2-image.png',
          description: 'New description',
          price: '100 USD'
        })
      })
      .catch((error) => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('city is not valid')
      })

  })

  it('fails on invalid image', () => {
    let errorThrown, user, room

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
          author: user.id,
          manager: user.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return editRoom(user.id, room.id, {
          nameRoom: 'RoomName',
          region: 'sur',
          city: 'DF, caracas',
          image: 1111,
          description: 'New description',
          price: '100 USD'
        })
      })
      .catch((error) => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('image is not valid')
      })

  })

  it('fails on invalid description', () => {
    let errorThrown, user, room

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
          author: user.id,
          manager: user.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return editRoom(user.id, room.id, {
          nameRoom: 'RoomName',
          region: 'sur',
          city: 'DF, caraxas',
          image: 'https://example.com/2-image.png',
          description: 1111,
          price: '100 USD'
        })
      })
      .catch((error) => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('description is not valid')
      })

  })

  it('fails on invalid price', () => {
    let errorThrown, user, room

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
          author: user.id,
          manager: user.id
        })
      })
      .then(createdRoom => {
        room = createdRoom
        return editRoom(user.id, room.id, {
          nameRoom: 'RoomName',
          region: 'sur',
          city: 'DF, caraxas',
          image: 'https://example.com/2-image.png',
          description: 'Old description',
          price: 11111
        })
      })
      .catch((error) => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('price is not valid')
      })

  })

  after(() => Promise.all([User.deleteMany(), Room.deleteMany()]).then(() => mongoose.disconnect()))
})