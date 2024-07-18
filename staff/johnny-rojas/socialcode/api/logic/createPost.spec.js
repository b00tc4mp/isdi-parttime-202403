import 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Post, User } from '../data/index.js'

import createPost from './createPost.js'

import { ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('createPost', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all()))

  beforeEach(() => User.deleteMany())

  it('')
})