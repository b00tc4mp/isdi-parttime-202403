import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { Message, Chat, User } from '../data/index.js'

import createMessage from './createMessage.js'
import { SystemError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('createMessage', () => {
  before(() =>
    mongoose.connect(MONGODB_URL_TEST).then(() => {
      return Promise.all([
        User.deleteMany(),
        Chat.deleteMany(),
        Message.deleteMany(),
      ])
    })
  )

  beforeEach(() =>
    Promise.all([User.deleteMany(), Chat.deleteMany(), Message.deleteMany()])
  )

  it('succeeds on valid userId, messageText, and chatId', () => {
    return User.create({
      name: 'Jorge',
      email: 'Jor@ge.com',
      password: 'password123',
      artisticName: 'Jorge',
      city: 'Madrid',
      discipline: 'mago',
      description: 'magia',
      image: 'https',
      video: 'https',
      dates: ['2024-08-17'],
      role: 'artist',
    })
      .then((user) =>
        Chat.create({
          participants: [user.id, new ObjectId()],
          date: new Date(),
        }).then((chat) => ({ user, chat }))
      )
      .then(({ user, chat }) =>
        createMessage(user.id.toString(), 'Hello world', chat.id.toString())
          .then(() => Message.findOne())
          .then((message) => {
            expect(message.sender.toString()).to.equal(user.id.toString())
            expect(message.text).to.equal('Hello world')
            expect(message.chatId.toString()).to.equal(chat.id.toString())
            expect(message.date).to.be.an.instanceOf(Date)
          })
      )
  })

  it('fails on invalid userId', () => {
    let errorThrown
    try {
      createMessage('invalidid', 'Hello world', new ObjectId().toString())
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
    }
  })

  it('fails on invalid messageText', () => {
    let errorThrown
    try {
      createMessage(new ObjectId().toString(), '', new ObjectId().toString())
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('messageText is not valid')
    }
  })

  it('fails on invalid chatId', () => {
    let errorThrown
    try {
      createMessage(new ObjectId().toString(), 'Hello world', 'invalidid')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('chatId is not valid')
    }
  })

  after(() =>
    Promise.all([
      Message.deleteMany(),
      Chat.deleteMany(),
      User.deleteMany(),
    ]).then(() => mongoose.disconnect())
  )
})
