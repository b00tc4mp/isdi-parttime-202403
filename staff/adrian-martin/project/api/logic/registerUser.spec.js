import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/index.js'
import { DuplicityError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

// npm run test-inspect

describe('registerUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
    beforeEach(() => User.deleteMany())

    it('succeds on register user', () => {
        registerUser('Esme', 'esmeralda', 'esme@ralda.com', '123123123')
            .then(() => User.findOne())
            .then(user => {
                expect(user.name).to.equal('Esme')
                expect(user.username).to.equal('esmeralda')
                expect(user.email).to.equal('esme@ralda.com')
                expect(user.password).to.not.equal('123123123')

                return bcrypt.compare('123123123', user.password)
            })
    })

    it('fails on existing user', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mocha', username: 'MochaChai', email: 'Mocha@Chai.com', password: hash }))
            .then(() => registerUser('Mocha', 'MochaChai', 'Mocha@Chai.com', '123123123'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal('User already exists')
            })
    })

    it('fails on invalid name', () => {
        let errorThrown

        try {
            registerUser(123456789, 'MochaChai', 'Mocha@Chai.com', '123456789')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('name is not valid')
        }
    })

    it('fails on invalid username', () => {
        let errorThrown

        try {
            registerUser('Movha', 123123123, 'Mocha@Chai.com', '123456789')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('username is not valid')
        }
    })

    it('fails on invalid email', () => {
        let errorThrown

        try {
            registerUser('Movha', 'MochaChai', 123123123, '123456789')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('email is not valid')
        }
    })

    it('fails on invalid password', () => {
        let errorThrown

        try {
            registerUser('Movha', 'MochaChai', 'Mocha@Chai.com', 123456789)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('password is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})