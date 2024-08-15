import 'dotenv/config'
import { User, Room } from '../data/index.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import createRoom from '../logic/createRoom.js'
import { NotFoundError, ContentError } from 'com/errors.js'
import { expect } from 'chai'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = mongoose.Types

debugger

describe('createRoom', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Room.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Room.deleteMany()]))

  it('succeeds on new room', () =>
    bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(user =>
        createRoom(user.id, 'Room', 'Este', 'Anzoategui, El tigre', 'https://miro.medium.com/vqW5DGh9CQS4hLY5FXzA.png', 'hab doble', '5344 USD')
          .then(() => Room.findOne())
          .then(room => {
            expect(room.author.toString()).to.equal(user.id)
            expect(room.nameRoom).to.equal('Room')
            expect(room.region).to.equal('Este')
            expect(room.city).to.equal('Anzoategui, El tigre')
            expect(room.image).to.equal('https://miro.medium.com/vqW5DGh9CQS4hLY5FXzA.png')
            expect(room.description).to.equal('hab doble')
            expect(room.price).to.equal('5344 USD')
          })
          .then(() => User.findById(user.id))
          .then(updatedUser => {
            expect(updatedUser.role).to.equal('host')
          })
      )
  )

  it('fails on non-existing user', () => {
    let errorThrown

    return createRoom(new ObjectId().toString(), 'Room', 'Este', 'Anzoategui, El tigre', 'https://miro.medium.com/vqW5DGh9CQS4hLY5FXzA.png', 'hab doble', '5344 USD')
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })

  it('fails on invalid userId', () => {
    let errorThrown

    try {
      createRoom(1111, 'Room', 'Este', 'Anzoategui, El tigre', 'https://miro.medium.com/vqW5DGh9CQS4hLY5FXzA.png', 'hab doble', '5344 USD')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
    }
  })
  it('fails on invalid nameRoom', () => {
    let errorThrown

    try {
      createRoom(new ObjectId().toString(), 1111, 'Este', 'Anzoategui, El tigre', 'https://miro.medium.com/vqW5DGh9CQS4hLY5FXzA.png', 'hab doble', '5344 USD')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('Room name is not valid')
    }
  })
  it('fails on invalid region', () => {
    let errorThrown

    try {
      createRoom(new ObjectId().toString(), 'Room', 1111, 'Anzoategui, El tigre', 'https://miro.medium.com/vqW5DGh9CQS4hLY5FXzA.png', 'hab doble', '5344 USD')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('region is not valid')
    }
  })
  it('fails on invalid city', () => {
    let errorThrown

    try {
      createRoom(new ObjectId().toString(), 'Room', 'Este', 1432, 'https://miro.medium.com/vqW5DGh9CQS4hLY5FXzA.png', 'hab doble', '5344 USD')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('city is not valid')
    }
  })
  it('fails on invalid image', () => {
    let errorThrown

    try {
      createRoom(new ObjectId().toString(), 'Room', 'Este', 'Anzoategui, El tigre', 8718, 'hab doble', '5344 USD')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('imagen is not valid')
    }
  })
  it('fails on invalid desciption', () => {
    let errorThrown

    try {
      createRoom(new ObjectId().toString(), 'Room', 'Este', 'Anzoategui, El tigre', 'https://miro.medium.com/vqW5DGh9CQS4hLY5FXzA.png', 962929, '5344 USD')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('description is not valid')
    }
  })
  it('fails on invalid price', () => {
    let errorThrown

    try {
      createRoom(new ObjectId().toString(), 'Room', 'Este', 'Anzoategui, El tigre', 'https://miro.medium.com/vqW5DGh9CQS4hLY5FXzA.png', 'hab doble', 987769)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('price is not valid')
    }
  })

  after(() => Promise.all([User.deleteMany(), Room.deleteMany()]).then(() => mongoose.disconnect()))
})