import 'dotenv/config'
import getAllUsers from './getAllUsers.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/index.js'
import { } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

// npm run test-inspect

describe('getAllUsers', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})