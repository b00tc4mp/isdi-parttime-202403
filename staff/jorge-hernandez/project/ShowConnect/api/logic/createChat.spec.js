import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { Chat, User } from '../data/index.js'

import createChat from './createChat.js'
import { NotFoundError, ContentError, SystemError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('createChat', () => {
  before(() =>
    mongoose.connect(MONGODB_URL_TEST).then(() => {
      return Promise.all([User.deleteMany(), Chat.deleteMany()])
    })
  )

  beforeEach(() => Promise.all([User.deleteMany(), Chat.deleteMany()]))

  it('succeeds on new chat with valid client and artist', () => {
    const artistData = {
      name: 'Artist',
      artisticName: 'Artista1',
      email: 'artist1@example.com',
      city: 'New York',
      discipline: 'Painter',
      description: 'Experienced painter',
      image: 'https://example.com/image.jpg',
      video: 'https://example.com/video.mp4',
      dates: ['2024-08-01', '2024-08-02'],
      password: 'password123',
      role: 'artist',
    }

    return bcrypt
      .hash('clientpassword', 8)
      .then((hash) =>
        User.create({
          name: 'Client',
          email: 'client@example.com',
          password: hash,
          role: 'client',
        })
      )
      .then((client) =>
        User.create(artistData).then((artist) =>
          createChat(client.id, artist.id).then(() => ({ client, artist }))
        )
      )
      .then(({ client, artist }) =>
        Chat.findOne().then((chat) => {
          expect(chat.participants.map((id) => id.toString())).to.include(
            client.id.toString()
          )
          expect(chat.participants.map((id) => id.toString())).to.include(
            artist.id.toString()
          )
          expect(chat.participants).to.have.lengthOf(2)
          expect(chat.date).to.be.an.instanceOf(Date)
        })
      )
  })

  it('fails on invalid userId', () => {
    let errorThrown
    try {
      createChat('invalid-id', new ObjectId().toString())
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
    }
  })

  it('fails on invalid artistId', () => {
    let errorThrown
    try {
      createChat(new ObjectId().toString(), 'invalid-id')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('artistId is not valid')
    }
  })

  after(() =>
    Chat.deleteMany().then(() =>
      User.deleteMany().then(() => mongoose.disconnect())
    )
  )
})
