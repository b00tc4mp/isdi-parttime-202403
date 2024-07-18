import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/index.js'

import getUserName from './getUserName.js'
import { SystemError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('getUserName', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())
  
  it('found user id', () =>
    bcrypt.hash(1234, 8)
    
  )

})