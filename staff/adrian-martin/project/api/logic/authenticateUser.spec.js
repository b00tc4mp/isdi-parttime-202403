import 'dotenv/config'
import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/index.js'
import { ContentError, CredentialError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

// npm run test-inspect

describe('authenticateUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Cola', username: 'colacao', email: 'cola@cao.com', password: hash }))
            .then(() => authenticateUser('colacao', '123123123'))
            .then(userId => {
                expect(userId).to.be.a.string
                expect(userId).to.have.lengthOf(24)
            })
    )

    it('fails on non-existing user', () =>
        authenticateUser('meloinvento', '123123123')
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('User not found')
            })
    )

    it('fails on non-existing user by wrong password', () => {
        let errorThrown

        return bcrypt.hash('123123123_', 8)
            .then(hash => User.create({ name: 'Cola', username: 'colacao', email: 'cola@cao.com', password: hash }))
            .then(() => authenticateUser('colacao', '123123123'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialError)
                expect(errorThrown.message).to.equal('Wrong password')
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
            authenticateUser('Colacao', '1231')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('password is not valid')
        }

    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})