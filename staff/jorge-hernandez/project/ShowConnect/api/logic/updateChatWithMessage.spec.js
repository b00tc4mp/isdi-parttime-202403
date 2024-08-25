import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { Chat, Message } from '../data/index.js'
import updateChatWithMessage from './updateChatWithMessage.js'
import { SystemError, ContentError } from 'com/errors.js'

const { ObjectId } = mongoose.Types
const { MONGODB_URL_TEST } = process.env

describe('updateChatWithMessage', function () {
  before((done) => {
    mongoose
      .connect(MONGODB_URL_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => done())
      .catch(done)
  })

  beforeEach((done) => {
    if (mongoose.connection.readyState === 0) {
      done(new Error('Database not connected'))
    } else {
      Promise.all([Chat.deleteMany(), Message.deleteMany()])
        .then(() => done())
        .catch(done)
    }
  })

  it('should add a message to an existing chat successfully', function (done) {
    this.timeout(5000) // Aumenta el timeout si es necesario
    const chatId = new ObjectId().toString()
    const messageId = new ObjectId().toString()

    // Crear un chat de prueba
    Chat.create({ _id: chatId, messages: [] })
      .then(() => updateChatWithMessage(chatId, messageId))
      .then((result) => {
        expect(result).to.have.property('success', true)
        expect(result.chat).to.be.an('object')
        expect(result.chat.messages).to.include(messageId)
        done()
      })
      .catch(done)
  })

  it('should throw a SystemError if the chat does not exist', function (done) {
    const invalidChatId = new ObjectId().toString()
    const messageId = new ObjectId().toString()

    updateChatWithMessage(invalidChatId, messageId).catch((error) => {
      expect(error).to.be.instanceOf(SystemError)
      expect(error.message).to.equal('Chat not found')
      done()
    })
  })

  it('should throw a ContentError if there is a validation error', function (done) {
    const invalidChatId = 'invalid-id'
    const messageId = new ObjectId().toString()

    try {
      updateChatWithMessage(invalidChatId, messageId)
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.equal('id is not valid')
      done()
    }
  })

  after((done) => {
    mongoose
      .disconnect()
      .then(() => done())
      .catch(done)
  })
})
