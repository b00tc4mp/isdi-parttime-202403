import 'dotenv/config'
import mongoose, { Types } from "mongoose"
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Game, User } from '../data/index.js'

import editUsername from './editUsername.js'
import { } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

// npm run test-inspect

describe('editUsername', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
    beforeEach(() => User.deleteMany())

    after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()))
})