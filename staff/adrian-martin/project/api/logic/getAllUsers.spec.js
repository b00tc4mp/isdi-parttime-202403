import 'dotenv/config'
import getAllUsers from './getAllUsers.js'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/index.js'
import { NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

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

    // it('fails on non-existing user', () => {
    //     let errorThrown

    //     return getAllUsers(new ObjectId().toString())
    //         .catch(error => errorThrown = error)
    //         .finally(() => {
    //             expect(errorThrown).to.be.instanceOf(NotFoundError)
    //             expect(errorThrown.message).to.equal('User not found')
    //         })
    // })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})