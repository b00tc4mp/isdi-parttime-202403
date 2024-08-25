import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import { User, Chat, Message } from '../data/index.js'
import getUserChatsAndMessages from './getUsersChatsAndMessages.js'
import { SystemError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('getUserChatsAndMessages', () => {
  before(() => {
    return mongoose
      .connect(MONGODB_URL_TEST)
      .then(() => User.deleteMany())
      .then(() => Chat.deleteMany())
      .then(() => Message.deleteMany())
  })

  beforeEach(() => {
    return User.deleteMany()
      .then(() => Chat.deleteMany())
      .then(() => Message.deleteMany())
  })

  it('should return chats and messages for a user', (done) => {
    const userData = {
      name: 'John Doe',
      artisticName: 'Johnny',
      email: 'john.doe@example.com',
      city: 'Los Angeles',
      discipline: 'Musician',
      description: 'A talented musician',
      image: 'https://example.com/image.jpg',
      video: 'https://example.com/video.mp4',
      password: 'password123',
      role: 'artist',
    }

    const messageData = {
      text: 'Hello, how are you?',
      date: new Date(),
    }

    let user, chat, message

    User.create(userData)
      .then((createdUser) => {
        user = createdUser
        const chatData = {
          participants: [user._id],
          messages: [],
        }
        return Chat.create(chatData)
      })
      .then((createdChat) => {
        chat = createdChat
        messageData.chatId = chat._id
        messageData.sender = user._id
        return Message.create(messageData)
      })
      .then((createdMessage) => {
        message = createdMessage
        return Chat.findByIdAndUpdate(
          chat._id,
          { $push: { messages: message._id } },
          { new: true }
        )
      })
      .then(() => {
        return getUserChatsAndMessages(user._id.toString())
      })
      .then((result) => {
        expect(result).to.be.an('array').that.is.not.empty

        const userChat = result[0]
        expect(userChat).to.have.property('id').that.equals(chat._id.toString())
        expect(userChat).to.have.property('participants').that.is.an('array')
          .that.is.not.empty
        expect(userChat).to.have.property('messages').that.is.an('array').that
          .is.not.empty

        const participant = userChat.participants[0]
        expect(participant)
          .to.have.property('id')
          .that.equals(user._id.toString())
        expect(participant).to.have.property('name', userData.name)
        expect(participant).to.have.property('email', userData.email)
        expect(participant).to.have.property(
          'artisticName',
          userData.artisticName
        )
        expect(participant).to.have.property('role', userData.role)

        const chatMessage = userChat.messages[0]
        expect(chatMessage)
          .to.have.property('id')
          .that.equals(message._id.toString())
        expect(chatMessage).to.have.property('text', messageData.text)

        // Comparar la fecha correctamente
        const expectedDate = new Date(messageData.date).toISOString()
        const actualDate = new Date(chatMessage.date).toISOString()
        expect(actualDate).to.equal(expectedDate)

        const messageSender = chatMessage.sender
        expect(messageSender)
          .to.have.property('id')
          .that.equals(user._id.toString())
        expect(messageSender).to.have.property('name', userData.name)
        expect(messageSender).to.have.property('email', userData.email)
        expect(messageSender).to.have.property(
          'artisticName',
          userData.artisticName
        )
        expect(messageSender).to.have.property('role', userData.role)

        done()
      })
      .catch(done)
  })

  after(() => {
    return mongoose.disconnect()
  })
})
