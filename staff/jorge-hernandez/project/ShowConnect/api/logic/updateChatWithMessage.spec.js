import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { Chat, Message } from '../data/index.js'
import updateChatWithMessage from './updateChatWithMessage.js'
import { SystemError, ContentError } from 'com/errors.js'
import validate from 'com/validate.js'

const { ObjectId } = mongoose.Types
const { MONGODB_URL_TEST } = process.env

describe('updateChatWithMessage', function () {
  before(() => {
    return mongoose
      .connect(MONGODB_URL_TEST)
      .then(() => Promise.all([Chat.deleteMany(), Message.deleteMany()]))
  })

  beforeEach(() => {
    return Promise.all([Chat.deleteMany(), Message.deleteMany()])
  })

  it('should add a message to an existing chat successfully', () => {
    const chatId = new ObjectId().toString()
    const messageId = new ObjectId().toString()

    return Chat.create({ _id: chatId, messages: [] })
      .then(() => updateChatWithMessage(chatId, messageId))
      .then((result) => {
        expect(result).to.have.property('success', true)
        expect(result.chat).to.be.an('object')
        expect(result.chat.messages).to.include(messageId)
      })
  })

  it('should throw a SystemError if the chat does not exist', () => {
    const invalidChatId = new ObjectId().toString()
    const messageId = new ObjectId().toString()

    return updateChatWithMessage(invalidChatId, messageId)
      .then(() => {
        throw new Error('Expected function to throw')
      })
      .catch((error) => {
        expect(error).to.be.instanceOf(SystemError)
        expect(error.message).to.equal('Chat not found')
      })
  })

  it('should throw a ContentError if there is a validation error', () => {
    const invalidChatId = 'invalidId'
    const messageId = new ObjectId().toString()

    try {
      validate.id(invalidChatId)
      updateChatWithMessage(invalidChatId, messageId)
        .then(() => {
          throw new Error('Expected function to throw')
        })
        .catch((error) => {
          expect(error).to.be.instanceOf(ContentError)
          expect(error.message).to.equal('id is not valid')
        })
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.equal('id is not valid')
    }
  })

  after(() => {
    return mongoose.disconnect()
  })
})
