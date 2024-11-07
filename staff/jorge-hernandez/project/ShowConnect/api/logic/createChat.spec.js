import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'
import { Chat } from '../data/index.js'
import createChat from './createChat.js'
import { SystemError, ContentError } from 'com/errors.js'
import validate from 'com/validate.js'

const { ObjectId } = mongoose.Types
const { MONGODB_URL_TEST } = process.env

describe('createChat', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Chat.deleteMany()))

  beforeEach(() => Chat.deleteMany())

  it('should create a chat with valid user and artist IDs', () => {
    const userId = new ObjectId().toString()
    const artistId = new ObjectId().toString()

    return createChat(userId, artistId).then((chat) => {
      expect(chat).to.be.an('object')
      expect(chat.participants).to.include(userId)
      expect(chat.participants).to.include(artistId)
      expect(chat.date).to.be.a('date')
    })
  })

  it('should throw a ContentError if userId is invalid', () => {
    const invalidUserId = 'invalidId'
    const artistId = new ObjectId().toString()

    try {
      createChat(invalidUserId, artistId)
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.equal('userId is not valid')
    }
  })

  it('should throw a ContentError if artistId is invalid', () => {
    const userId = new ObjectId().toString()
    const invalidArtistId = 'invalidId'

    try {
      createChat(userId, invalidArtistId)
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.equal('artistId is not valid')
    }
  })

  after(() => Chat.deleteMany().then(() => mongoose.disconnect()))
})
