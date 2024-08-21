import 'dotenv/config'

import mongoose, { connect, Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { NotFoundError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

import { User } from '../data/index.js'

import updateCustomer from './updateCustomer.js'

const { MONGODB_URL_TEST } = process.env


describe('update customer', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on update customer', () =>


        after(() => User.deleteMany().then(() => mongoose.disconnect()))
    )
})


