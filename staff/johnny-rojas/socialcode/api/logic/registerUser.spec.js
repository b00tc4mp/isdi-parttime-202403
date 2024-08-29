import 'dotenv'
import mongoose, { Types } from 'mongoose'

import bcrypt from 'bcryptjs'

import registerUser from '../logic/registerUser.js'
import { User } from '../data/index.js'
import { DuplicityError, ContentError, MatchError } from 'com/errors.js'

import { expect } from 'chai'

const { MONGODB_URL_TEST } = process.env


debugger

describe('registerUser', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it('succeeds register user', () =>
    registerUser('Mocha', 'Chai', 'mocha@chai.com', 'mochachai', '1234', '1234')
      .then(() => User.findOne())
      .then((user) => {
        expect(user.name).to.equal('Mocha')
        expect(user.surname).to.equal('Chai')
        expect(user.email).to.equal('mocha@chai.com')
        expect(user.username).to.equal('mochachai')
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
        username: 'mochachai',
        password: hash
      }))
    
      .then(() => registerUser('Mocha', 'Chai', 'mocha@chai.com', 'mochachai', '1234', '1234'))
      .catch((error) => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(DuplicityError)
        expect(errorThrown.message).to.equal('user already exists')
    }) 
  })

  it('fail on valid name', () => {
    let errorThrown

    try {
      registerUser( 35432, 'Chai', 'mocha@chai.com', 'mochachai', '1234', '1234')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('name is not valid')
      
    }
  })

  it('fail on valid surname', () => {
    let errorThrown

    try {
      registerUser( 'Mocha', 986986, 'mocha@chai.com', 'mochachai', '1234', '1234')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('surname is not valid')
      
    }
  })

  it('fail on valid email', () => {
    let errorThrown

    try {
      registerUser( 'Mocha', 'Chai', 134314, 'mochachai', '1234', '1234')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('email is not valid')
      
    }
  })

  it('fail on valid username', () => {
    let errorThrown

    try {
      registerUser( 'Mocha', 'Chai', 'mocha@chai.com', 2434, '1234', '1234')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('username is not valid')
      
    }
  })

  it('fail on valid password', () => {
    let errorThrown

    try {
      registerUser( 'Mocha', 'Chai', 'mocha@chai.com', 'mochachai', 1234, '1234')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('password is not valid')
      
    }
  })

  it('fail on valid passwordRepeat', () => {
    let errorThrown

    try {
      registerUser( 'Mocha', 'Chai', 'mocha@chai.com', 'mochachai', '1234', 1234)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(MatchError)
      expect(errorThrown.message).to.equal('passwords don\'t match')
      
    }
  })

  after(() => User.deleteMany().then(() => mongoose.disconnect))
})



