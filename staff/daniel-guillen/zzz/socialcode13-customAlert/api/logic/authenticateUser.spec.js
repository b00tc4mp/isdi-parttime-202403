import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/index.js'

import authenticateUser from './authenticateUser.js'
import { ContentError, CredentialsError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('authenticateUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        bcrypt.hash('123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Pollo', email: 'mac@pollo.com', username: 'macpollo', password: hash }))
            .then(() => authenticateUser('macpollo', '123'))
            .then(userId => {
                expect(userId).to.be.a.string
                expect(userId).to.have.lengthOf(24)
            })
    )

    it('fails on non-existing user', () =>
        authenticateUser('macpollo', '123')
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('user not found ❌')
            })
    )

    it('fails on existing user by wrong password', () => {
        let errorThrown

        return bcrypt.hash('234234234', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Pollo', email: 'mac@pollo.com', username: 'macpollo', password: hash }))
            .then(() => authenticateUser('macpollo', '123'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('wrong password ❌')
            })
    })

    it('fails on invalid username', () => {
        let errorThrown

        try {
            authenticateUser(123, '123')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('username is not valid ❌')
        }
    })

    it('fails on invalid password', () => {
        let errorThrown

        try {
            authenticateUser('macpollo', '')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('password is not valid ❌')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
