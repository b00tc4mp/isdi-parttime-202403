import 'dotenv/config'
import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/index.js'
import { ContentError, CredentialError } from 'com/error.js'

const { MONGODB_URL_TEST } = process.env

describe('authenticateUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Cola', surname: 'Cao', email: 'cola@cao.com', username: 'colacao', password: hash }))
            .then(() => authenticateUser('colacao', '123123123'))
            .then(userId => {
                expect(userId).to.be.a.string
                expect(userId).to.have.lengthOf(24)
            })
    )

    it('fails on non-existing user', () =>
        authenticateUser('meloinvento', '123123123')
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialError)
                expect(error.message).to.equal('user not found')
            })
    )

    it('fails on non-existing user by wrong password', () => {
        let errorThrown

        return bcrypt.hash('123123123_', 8)
            .then(hash => User.create({ name: 'Cola', surname: 'Cao', email: 'cola@cao.com', username: 'colacao', password: hash }))
            .then(() => authenticateUser('colacao', '123123123'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialError)
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

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})