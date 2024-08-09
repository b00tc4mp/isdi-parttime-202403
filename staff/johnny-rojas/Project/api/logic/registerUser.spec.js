import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import registerUser from './registerUser.js'
import { User } from '../data/index.js'
import { expect } from 'chai'
import { ContentError, DuplicityError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
debugger

describe('registerUser', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
  beforeEach(() => User.deleteMany())

  it('succeeds register user', () =>
    registerUser('Mocha', 'Chai', 'mocha@chai.com', '+58 414 455 7362', '1234', '1234')
      .then(() => User.findOne())
      .then((user) => {
        expect(user.name).to.equal('Mocha')
        expect(user.surname).to.be.equal('Chai')
        expect(user.email).to.be.equal('mocha@chai.com')
        expect(user.phone).to.be.equal('+58 414 455 7362')
        return bcrypt.compare('1234', user.password)
      })
      .then((match) => expect(match).to.be.true)
  )

  it('user already exists', () => {
    let errorThrown

    bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Mocha',
        surname: 'Chai',
        email: 'mocha@chai.com',
        phone: '+58 414 455 7362',
        password: hash
      }))
      .then(() => registerUser('Mocha', 'Chai', 'mocha@chia.com', '+58 414 455 7362', '1234', '1234'))
      .catch((error) => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(DuplicityError)
        expect(errorThrown.message).to.equal('user already exists')
      })

    it('fails on valid name', () => {
      let errorThrown

      try {
        registerUser(9879, 'Chai', 'mocha@chai.com', '+58 414 455 7362', '1234', '1234')
      } catch (error) {
        errorThrown = error
      } finally {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('name is not valid')
      }
    })

    it('fails on valid surname', () => {
      let errorThrown

      try {
        registerUser('Mocha', 9639, 'mocha@chai.com', '+58 414 455 7362', '1234', '1234')
      } catch (error) {
        errorThrown = error
      } finally {
        expect(erroThrown).to.be.instanceOf(ContentError)
        expect(errorThrown).to.equal('surname is not valid')
      }
    })

    it('fails on valid email', () => {
      let errorThrown

      try {
        registerUser('Mocha', 'Chai', 436, '+58 414 455 7362', '1234', '1234')
      } catch (error) {
        errorThrown = error
      } finally {
        expect(erroThrown).to.be.instanceOf(ContentError)
        expect(errorThrown).to.equal('email is not valid')
      }
    })

    it('fails on valid phone', () => {
      let errorThrown

      try {
        registerUser('Mocha', 'Chai', 'mocha@chai.com', +58, '1234', '1234')
      } catch (error) {
        errorThrown = error
      } finally {
        expect(erroThrown).to.be.instanceOf(ContentError)
        expect(errorThrown).to.equal('phone is not valid')
      }
    })

    it('fails on valid password', () => {
      let errorThrown

      try {
        registerUser('Mocha', 'Chai', 'mocha@chai.com', '+58 414 455 7362', 1234, '1234')
      } catch (error) {
        errorThrown = error
      } finally {
        expect(erroThrown).to.be.instanceOf(ContentError)
        expect(errorThrown).to.equal('password is not valid')
      }
    })

    it('fails on valid passwordRepeat', () => {
      let errorThrown

      try {
        registerUser('Mocha', 'Chai', 'mocha@chai.com', '+58 414 455 7362', '1234', 1234)
      } catch (error) {
        errorThrown = error
      } finally {
        expect(erroThrown).to.be.instanceOf(ContentError)
        expect(errorThrown).to.equal('passwords don\'t match')
      }
    })
    after(() => User.deleteMany().then(() => mongoose.disconnect()))
  })
})
