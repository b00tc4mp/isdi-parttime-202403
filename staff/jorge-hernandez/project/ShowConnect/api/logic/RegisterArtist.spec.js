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
} from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('registerArtist', () => {
  before((done) => {
    mongoose
      .connect(MONGODB_URL_TEST)
      .then(() => User.deleteMany())
      .then(() => done())
      .catch(done)
  })

  beforeEach((done) => {
    User.deleteMany()
      .then(() => done())
      .catch(done)
  })

  it('succeeds on new user', (done) => {
    registerArtist(
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
      .then(() => User.findOne())
      .then((user) => {
        expect(user.name).to.equal('David')
        expect(user.artisticName).to.equal('David Bisbal')
        expect(user.email).to.equal('david@bisbal.com')
        expect(user.image).to.equal(
          'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQzZXI4NHNnc3luYms4MTNlczBubGhveWF5Z2p1NW0zMG5lOWF2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OyjowP63pRVQJl9dB/giphy.gif'
        )
        expect(user.video).to.equal('https')

        return bcrypt.compare('123123123', user.password)
      })
      .then((match) => {
        expect(match).to.be.true
        done()
      })
      .catch(done)
  })

  it('fails on existing user', (done) => {
    let errorThrown

    bcrypt
      .hash('1234', 8)
      .then((hash) =>
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
      .then(() =>
        registerArtist(
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
      )
      .catch((error) => {
        errorThrown = error
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(DuplicityError)
        expect(errorThrown.message).to.equal('User already exists')
        done()
      })
  })

  it('fails on invalid name', (done) => {
    let errorThrown
    try {
      registerArtist(
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
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(CredentialsError)
      expect(errorThrown.message).to.equal('name is not valid')
      done()
    }
  })

  it('fails on invalid artisticName', (done) => {
    let errorThrown
    try {
      registerArtist(
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
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(CredentialsError)
      expect(errorThrown.message).to.equal('artisticName is not valid')
      done()
    }
  })

  it('fails on invalid email', (done) => {
    let errorThrown
    try {
      registerArtist(
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
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(CredentialsError)
      expect(errorThrown.message).to.equal('email is not valid')
      done()
    }
  })

  it('fails on invalid password', (done) => {
    let errorThrown
    try {
      registerArtist(
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
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('password is not valid')
      done()
    }
  })

  it('fails on non-matching password repeat', (done) => {
    let errorThrown
    try {
      registerArtist(
        'David',
        'David Bisbal',
        'cantante',
        'Madrid',
        'Buleria Buleria',
        'david@bisbal.com',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTQzZXI4NHNnc3luYms4MTNlczBubGhveWF5Z2p1NW0zMG5lOWF2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3OyjowP63pRVQJl9dB/giphy.gif',
        'https',
        '123123123',
        123123123
      )
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(MatchError)
      expect(errorThrown.message).to.equal("passwords don't match")
      done()
    }
  })

  after((done) => {
    User.deleteMany()
      .then(() => mongoose.disconnect())
      .then(() => done())
      .catch(done)
  })
})
