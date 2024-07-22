import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/index.js'
import { ContentError, DuplicityError, MatchError } from 'com/error.js'

const { MONGODB_URL_TEST } = process.env

// npm run test-inspect

describe('registerUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
    beforeEach(() => User.deleteMany())

    it('succceds on register user', () => {
        registerUser('Esme', 'Ralda', 'esme@ralda.com', 'esmeralda', '123123123', '123123123')
            .then(() => User.findOne())
            .then(user => {
                expect(user.name).to.equal('Esme')
                expect(user.surname).to.equal('Ralda')
                expect(user.email).to.equal('esme@ralda.com')
                expect(user.username).to.equal('esmeralda')
                expect(user.password).to.equal('123123123')

                return bcrypt.compare('123123123', user.password)
            })
            .then((match) => expect(match).to.be.true)
    })

    it('fails on existing user', () => {
        let errorThrown

        return bcrypt.hash('123456789', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'Mocha@Chai.com', username: 'MochaChai', password: hash }))
            .then(() => registerUser('Mocha', 'Chai', 'Mocha@Chai.com', 'MochaChai', '123456789', '123456789'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal('user already exists')
            })
    })

    it('fails on invalid name', () => {
        let errorThrown

        try {
            registerUser(123456789, 'Chai', 'Mocha@Chai.com', 'MochaChai', '123456789', '123456789')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('name is not valid')
        }
    })

    it('fails on invalid surname', () => {
        let errorThrown

        try {
            registerUser('Mocha', 123456789, 'Mocha@Chai.com', 'MochaChai', '123456789', '123456789')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('surname is not valid')
        }
    })

    it('fails on invalid email', () => {
        let errorThrown

        try {
            registerUser('Mocha', 'Chai', 123456789, 'MochaChai', '123456789', '123456789')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('email is not valid')
        }
    })

    it('fails on invalid username', () => {
        let errorThrown

        try {
            registerUser('Mocha', 'Chai', 'Mocha@Chai.com', 123456789, '123456789', '123456789')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('username is not valid')
        }
    })

    it('fails on invalid password', () => {
        let errorThrown

        try {
            registerUser('Mocha', 'Chai', 'Mocha@Chai.com', 'MochaChai', 123456789, '123456789')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('password is not valid')
        }
    })

    it('fails on non.matching password repeat', () => {
        let errorThrown

        try {
            registerUser('Mocha', 'Chai', 'Mocha@Chai.com', 'MochaChai', '123456789', 123456789)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(MatchError)
            expect(errorThrown.message).to.equal('password don\'t match')
        }
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})


