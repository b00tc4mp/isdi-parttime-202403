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

    it('succeeds on get all users', () => {
        return bcrypt.hash('123456789', 8)
            .then(hash => User.create({
                name: 'Mocha',
                username: 'MochaChai',
                email: 'Mocha@Chai.com',
                password: hash
            }))
            .then(hash => User.create({
                name: 'Mocha2',
                username: 'MochaChai2',
                email: 'Mocha2@Chai.com',
                password: hash
            }))
            .then(() => getAllUsers())
            .then(users => {
                expect(users).to.be.an('array')
                expect(users).to.have.lengthOf(2)
            })
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})