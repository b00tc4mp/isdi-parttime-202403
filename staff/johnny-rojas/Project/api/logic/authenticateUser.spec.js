import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import authenticateUser from './authenticateUser.js'
import { ContentError, CredentialsError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('authenticateUser', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it('succeds on existing user', () =>
    bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Leon',
        surname: 'Rey',
        email: 'rey@leon.com',
        phone: '+58 414 987 9890 ',
        password: hash
      }))
    .then(() => authenticateUser('rey@leon.com', '1234'))
      .then(user => {
        expect(user).to.be.an('object')
        expect(user).to.have.property('id')
        expect(user).to.have.property('role')
        expect(user.id).to.be.a('string');
        expect(user.id).to.have.lengthOf(24);
        expect(user.role).to.be.a('string')
      })
  )
  it('fails on non existing email', () => {
    let errorThrown
    
    authenticateUser('peter@pan.com', '1234')
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(CredentialsError)
        expect(errorThrown.message).to.equal('email not found')
      })
  })
  
  it('fails on wrong password', () => {
    let errorThrown
    
    bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Leon',
        surname: 'Rey',
        email: 'rey@leon.com',
        phone: '+58 414 987 9890 ',
        password: hash
      }))
    .then(() => authenticateUser('rey@leon.com', '12345abcde'))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(CredentialsError)
        expect(errorThrown.message).to.equal('wrong password')
      })
  })

  it('fails on invalid email', () => { 
    let errorThrown

    try {
      authenticateUser(98779, '1234')
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('email is not valid')
    }
  })

  it('fails on invalid password', () => { 
    let errorThrown

    try {
      authenticateUser('rey@leon.com', 78686)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('password is not valid')
    }
  })

  after(() => User.deleteMany().then(() => mongoose.disconnect()))

})