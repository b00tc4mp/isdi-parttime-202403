import 'dotenv/config'
import mongoose, { Types } from "mongoose"
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Game, User } from '../data/index.js'

import editGame from './editGame.js'
import { } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

// npm run test-inspect

describe('editGame', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([Game.deleteMany(), User.deleteMany()])))
    beforeEach(() => Promise.all([Game.deleteMany(), User.deleteMany()]))

    it('')

    after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()))
})