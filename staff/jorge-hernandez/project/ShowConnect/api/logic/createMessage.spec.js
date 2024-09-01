import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { Message, Chat, User } from '../data/index.js'
import createMessage from './createMessage.js'
import { SystemError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('createMessage', () => {
  before(async () => {
    await mongoose.connect(MONGODB_URL_TEST)
    await Promise.all([
      User.deleteMany(),
      Chat.deleteMany(),
      Message.deleteMany(),
    ])
  })

  beforeEach(async () => {
    await Promise.all([
      User.deleteMany(),
      Chat.deleteMany(),
      Message.deleteMany(),
    ])
  })

  it('succeeds on valid userId, messageText, and chatId', async () => {
    const user = await User.create({
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

    const chat = await Chat.create({
      participants: [user.id, new ObjectId()],
      date: new Date(),
    })

    await createMessage(user.id.toString(), 'Hello world', chat.id.toString())
    const message = await Message.findOne()

    expect(message.sender.toString()).to.equal(user.id.toString())
    expect(message.text).to.equal('Hello world')
    expect(message.chatId.toString()).to.equal(chat.id.toString())
    expect(message.date).to.be.an.instanceOf(Date)
  })

  it('fails on invalid userId', async () => {
    try {
      await createMessage('invalidid', 'Hello world', new ObjectId().toString())
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.include('userId is not valid')
    }
  })

  it('fails on invalid messageText', async () => {
    try {
      await createMessage(
        new ObjectId().toString(),
        '',
        new ObjectId().toString()
      )
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.include('messageText is not valid')
    }
  })

  it('fails on invalid chatId', async () => {
    try {
      await createMessage(new ObjectId().toString(), 'Hello world', 'invalidid')
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.include('chatId is not valid')
    }
  })

  after(async () => {
    await Promise.all([
      Message.deleteMany(),
      Chat.deleteMany(),
      User.deleteMany(),
    ])
    await mongoose.disconnect()
  })
})
