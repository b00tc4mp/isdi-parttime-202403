import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import registerArtist from './registerArtist.js'
import {
  ContentError,
  CredentialsError,
  DuplicityError,
  MatchError,
  SystemError,
} from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('registerArtist', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it('succeeds on new user', async () => {
    await registerArtist(
      'David',
      'David Bisbal',
      'cantante',
      'Madrid',
      'Buleria Buleria',
      'david@bisbal.com',
      'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQzZXI4NHNnc3luYms4MTNlczBubGhveWF5Z2p1NW0zMG5lOWF2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OyjowP63pRVQJl9dB/giphy.gif',
      'https',
      '123123123',
      '123123123'
    )

    const user = await User.findOne()
    expect(user.name).to.equal('David')
    expect(user.artisticName).to.equal('David Bisbal')
    expect(user.email).to.equal('david@bisbal.com')
    expect(user.image).to.equal(
      'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQzZXI4NHNnc3luYms4MTNlczBubGhveWF5Z2p1NW0zMG5lOWF2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OyjowP63pRVQJl9dB/giphy.gif'
    )
    expect(user.video).to.equal('https')

    const match = await bcrypt.compare('123123123', user.password)
    expect(match).to.be.true
  })

  it('fails on existing user', async () => {
    await bcrypt.hash('1234', 8).then((hash) =>
      User.create({
        name: 'David',
        artisticName: 'David Bisbal',
        discipline: 'cantante',
        city: 'Madrid',
        description: 'Buleria Buleria',
        email: 'david@bisbal.com',
        image:
          'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQzZXI4NHNnc3luYms4MTNlczBubGhveWF5Z2p1NW0zMG5lOWF2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OyjowP63pRVQJl9dB/giphy.gif',
        video: 'https',
        password: hash,
        role: 'artist',
      })
    )

    try {
      await registerArtist(
        'David',
        'David Bisbal',
        'cantante',
        'Madrid',
        'Buleria Buleria',
        'david@bisbal.com',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQzZXI4NHNnc3luYms4MTNlczBubGhveWF5Z2p1NW0zMG5lOWF2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OyjowP63pRVQJl9dB/giphy.gif',
        'https',
        '123123123',
        '123123123'
      )
    } catch (error) {
      expect(error).to.be.instanceOf(DuplicityError)
      expect(error.message).to.equal('User already exists')
    }
  })

  it('fails on invalid name', async () => {
    try {
      await registerArtist(
        1234,
        'David Bisbal',
        'cantante',
        'Madrid',
        'Buleria Buleria',
        'david@bisbal.com',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQzZXI4NHNnc3luYms4MTNlczBubGhveWF5Z2p1NW0zMG5lOWF2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OyjowP63pRVQJl9dB/giphy.gif',
        'https',
        '123123123',
        '123123123'
      )
    } catch (error) {
      expect(error).to.be.instanceOf(CredentialsError)
      expect(error.message).to.equal('name is not valid')
    }
  })

  it('fails on invalid artisticName', async () => {
    try {
      await registerArtist(
        'David',
        1234,
        'cantante',
        'Madrid',
        'Buleria Buleria',
        'david@bisbal.com',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQzZXI4NHNnc3luYms4MTNlczBubGhveWF5Z2p1NW0zMG5lOWF2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OyjowP63pRVQJl9dB/giphy.gif',
        'https',
        '123123123',
        '123123123'
      )
    } catch (error) {
      expect(error).to.be.instanceOf(CredentialsError)
      expect(error.message).to.equal('artisticName is not valid')
    }
  })

  it('fails on invalid email', async () => {
    try {
      await registerArtist(
        'David',
        'David Bisbal',
        'cantante',
        'Madrid',
        'Buleria Buleria',
        'davidbisbal.com',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQzZXI4NHNnc3luYms4MTNlczBubGhveWF5Z2p1NW0zMG5lOWF2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OyjowP63pRVQJl9dB/giphy.gif',
        'https',
        '123123123',
        '123123123'
      )
    } catch (error) {
      expect(error).to.be.instanceOf(CredentialsError)
      expect(error.message).to.equal('email is not valid')
    }
  })

  it('fails on invalid password', async () => {
    try {
      await registerArtist(
        'David',
        'David Bisbal',
        'cantante',
        'Madrid',
        'Buleria Buleria',
        'david@bisbal.com',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQzZXI4NHNnc3luYms4MTNlczBubGhveWF5Z2p1NW0zMG5lOWF2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OyjowP63pRVQJl9dB/giphy.gif',
        'https',
        123123123,
        '123123123'
      )
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.equal('password is not valid')
    }
  })

  it('fails on non-matching password repeat', async () => {
    try {
      await registerArtist(
        'David',
        'David Bisbal',
        'cantante',
        'Madrid',
        'Buleria Buleria',
        'david@bisbal.com',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQzZXI4NHNnc3luYms4MTNlczBubGhveWF5Z2p1NW0zMG5lOWF2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OyjowP63pRVQJl9dB/giphy.gif',
        'https',
        '123123123',
        '123456789'
      )
    } catch (error) {
      expect(error).to.be.instanceOf(MatchError)
      expect(error.message).to.equal(`passwords don't match`)
    }
  })

  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
