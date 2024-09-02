import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import authenticateUser from './authenticateUser.js'
import { CredentialsError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('authenticateUser', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST))

  beforeEach(() => User.deleteMany())

  it('succeeds on existing user with correct password', async () => {
    const hash = await bcrypt.hash('123', 8)
    await User.create({
      name: 'Jorge',
      artisticName: 'Jorge Moreno',
      discipline: 'mago',
      city: 'madrid',
      description: 'description',
      email: 'jorge@moreno.com',
      image: 'http',
      video: 'http',
      password: hash,
    })

    const { userId, role } = await authenticateUser('jorge@moreno.com', '123')
    expect(userId).to.be.a('string')
    expect(role).to.be.a('string')
  })

  it('fails on non-existing user', async () => {
    try {
      await authenticateUser('test@test.com', '123')
    } catch (error) {
      expect(error).to.be.instanceOf(CredentialsError)
      expect(error.message).to.equal('user not found')
    }
  })

  it('fails on existing user with wrong password', async () => {
    const hash = await bcrypt.hash('correctpassword', 8)
    await User.create({
      name: 'Jorge',
      artisticName: 'Jorge Moreno',
      discipline: 'mago',
      city: 'madrid',
      description: 'description',
      email: 'jorge@moreno.com',
      image: 'http',
      video: 'http',
      password: hash,
    })

    try {
      await authenticateUser('jorge@moreno.com', 'wrongpassword')
    } catch (error) {
      expect(error).to.be.instanceOf(CredentialsError)
      expect(error.message).to.equal('wrong password')
    }
  })

  it('fails on invalid email format', () => {
    try {
      authenticateUser(1234567890, '123')
    } catch (error) {
      expect(error).to.be.instanceOf(CredentialsError)
      expect(error.message).to.equal('email is not valid')
    }
  })

  it('fails on invalid password format', () => {
    try {
      authenticateUser('jorge@moreno.com', 123)
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError)
      expect(error.message).to.equal('password is not valid')
    }
  })

  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
