import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/models/index.js'

import registerUser from './registerUser.js'
import { DuplicityError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger


describe('registerUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on new user', () =>
        registerUser('mocha', 'chai', 'mocha@chai.com', 'mochachai', '1234', '1234')
            .then(() => User.findOne())
            .then(user => {
                expect(user.name).to.equal('mocha')
                expect(user.surname).to.equal('chai')
                expect(user.email).to.equal('mocha@chai.com')
                expect(user.username).to.equal('mochachai')

                return bcrypt.compare('1234', user.password)
            })
            .then((match) => expect(match).to.be.true)
    )

    it('fails on existing user', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({ name: 'mocha', surname: 'chai', email: 'mocha@chai.com', username: 'mochachai', password: hash }))
            .then(() => registerUser('mocha', 'chai', 'mocha@chai.com', 'mochachai', '1234', '1234'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal('User already exists')

            })
    })

    it('fails on ivalid username', () => {

        let errorThrown

        try {
            registerUser(1234567890, 'chai', 'mocha@chai.com', 'mochachai', '1234', '1234')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('name is not valid')
        }
    })

    it('fails on ivalid surname', () => {

        let errorThrown

        try {
            registerUser('mocha', 123, 'mocha@chai.com', 'mochachai', '1234', '1234')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('name is not valid')
        }
    })

    it('fails on invalid email', () => {
        let errorThrown

        try {
            registerUser('mocha', 'chai', 'mochachai.com', 'mochachai', '1234', '1234')
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
            registerUser('mocha', 'chai', 'mocha@chai.com', 123, '1234', '1234')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('email is not valid')
        }
    })

    it('fails on ivalid password', () => {

        let errorThrown

        try {
            registerUser('mocha', 'chai', 'mocha@chai.com', 'mochachai', 'ffff', '1234')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('name is not valid')
        }
    })


    it("fails on non-matching password repeat", () => {
        let errorThrown
        try {
            registerUser('mocha', 'chai', 'mocha@chai.com', 'mochachai', '1234', '6666')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(MatchError)
            expect(errorThrown.message).to.equal("passwords don\'t match")
        }
    })



    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})