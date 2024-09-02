import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import registerClient from './registerClient.js'
import {
  ContentError,
  CredentialsError,
  DuplicityError,
  MatchError,
} from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('registerClient', () => {
  before(async () => {
    await mongoose.connect(MONGODB_URL_TEST)
    await User.deleteMany()
  })

  beforeEach(async () => {
    await User.deleteMany()
  })

  it('succeeds on new user', async () => {
    await registerClient('David', 'david@bisbal.com', '123123123', '123123123')
    const user = await User.findOne()

    expect(user.name).to.equal('David')
    expect(user.email).to.equal('david@bisbal.com')

    const match = await bcrypt.compare('123123123', user.password)
    expect(match).to.be.true
  })

  it('fails on existing user', async () => {
    let errorThrown

    await bcrypt.hash('1234', 8).then((hash) =>
      User.create({
        name: 'David',
        email: 'david@bisbal.com',
        role: 'client',
        password: hash,
      })
    )

    try {
      await registerClient(
        'David',
        'david@bisbal.com',
        '123123123',
        '123123123'
      )
    } catch (error) {
      errorThrown = error
    }

    expect(errorThrown).to.be.instanceOf(DuplicityError)
    expect(errorThrown.message).to.equal('User already exists')
  })

  it('fails on invalid name', async () => {
    let errorThrown

    try {
      await registerClient(1234, 'david@bisbal.com', '123123123', '123123123')
    } catch (error) {
      errorThrown = error
    }

    expect(errorThrown).to.be.instanceOf(CredentialsError)
    expect(errorThrown.message).to.equal('name is not valid')
  })

  it('fails on invalid email', async () => {
    let errorThrown

    try {
      await registerClient('David', 'invalid-email', '123123123', '123123123')
    } catch (error) {
      errorThrown = error
    }

    expect(errorThrown).to.be.instanceOf(CredentialsError)
    expect(errorThrown.message).to.equal('email is not valid')
  })

  it('fails on invalid password', async () => {
    let errorThrown

    try {
      await registerClient('David', 'david@bisbal.com', 123123123, '123123123')
    } catch (error) {
      errorThrown = error
    }

    expect(errorThrown).to.be.instanceOf(ContentError)
    expect(errorThrown.message).to.equal('password is not valid')
  })

  it('fails on non-matching password repeat', async () => {
    let errorThrown

    try {
      await registerClient(
        'David',
        'david@bisbal.com',
        '123123123',
        'differentpassword'
      )
    } catch (error) {
      errorThrown = error
    }

    expect(errorThrown).to.be.instanceOf(MatchError)
    expect(errorThrown.message).to.equal("passwords don't match")
  })

  after(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })
})
