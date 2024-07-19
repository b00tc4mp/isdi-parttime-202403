import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/index.js'

import authenticateUser from './authenticateUser.js'

import { ContentError, CredentialsError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({ name: 'Jon', surname: 'Snow', email: 'jon@snow', username: 'JonSnow', password: hash }))
            .then(() => authenticateUser('JonSnow', '1234'))
            .then(userId => {
                expect(userId).to.be.a.string
                expect(userId).to.have.lengthOf(24)
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return authenticateUser('meloinvento', '123456')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on existing user by wrong password', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({ name: 'Jon', surname: 'Snow', email: 'jon@snow', username: 'JonSnow', password: hash }))
            .then(() => authenticateUser('JonSnow', '123456'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('wrong password')
            })
    })

    it('fails om invalid username', () => {
        let errorThrown

        try {
            authenticateUser(1234, '1234')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.be.equal('username is not valid')
        }
    })

    it('fails on invalid password', () => {
        let errorThrown

        try {
            authenticateUser('somebody', 123123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('password is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
