import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import authenticateUser from './authenticateUser.js'
import { User } from '../data/index.js'
import { ContentError, CredentialsError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('authenticateUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeds on existin user', () =>
        bcrypt.hash('123123123', 9)
            .then(hash => User.create({ name: 'Angel', surname: 'Patiño', email: 'angel@patino.com', username: 'anxo', password: hash }))
            .then(() => authenticateUser('anxo', '123123123'))
            .then(userId => {
                expect(userId).to.be.a.string
                expect(userId).to.have.lengthOf(24)
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        authenticateUser('noExisto', '123123123')
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('user not found')
            })
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown).to.equal('wrong password')
            })
    })

    it('fails on invalid usernarme', () => {
        let errorThrown

        try {
            authenticateUser(3333, '123123123')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown).to.equal('username is not valid')
        }
    })

    it('fails on invalid password', () => {
        let errorThrown

        try {
            authenticateUser('Angel', '000000000')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown).to.equal('password is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})
