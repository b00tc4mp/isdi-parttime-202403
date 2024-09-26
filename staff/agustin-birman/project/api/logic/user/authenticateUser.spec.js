import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../../data/index.js'

import authenticateUser from './authenticateUser.js'
import { ContentError, CredentialsError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env


describe('authenticateUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeds on existing user', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash, userType: 'teacher' }))
            .then(() => authenticateUser('macbook', '123123123'))
            .then(userAuth => {
                expect(userAuth).to.be.an('object')

            })
    )

    it('fails on non-existing user', () => {
        let errorThrown
        authenticateUser('RandomName', '12345678')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('user not found')
            })
    }
    )

    it('fails on existing user by wrong password', () => {
        let errorThrown

        return bcrypt.hash('234234234', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash, userType: 'teacher' }))
            .then(() => authenticateUser('macbook', '123123123'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('wrong password')
            })
    })

    it('fails on invalid username', () => {
        let errorThrown

        try {
            authenticateUser(1234567890, '123123123')
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
            authenticateUser('pepe', '12312')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('password is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})