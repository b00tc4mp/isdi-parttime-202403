import 'dotenv/config'

import mongoose from 'mongoose'

import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { ContentError, CredentialsError } from 'com/errors.js'

import { User } from '../data/index.js'

import authenticateUser from './authenticateUser.js'

const { MONGODB_URL_TEST } = process.env


describe('authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow.com',
                password: hash,
                role: 'provider'
            }))
            .then(() => authenticateUser('jon@snow.com', '1234'))
            .then((userId => {
                expect(userId).to.be.a('string')
                expect(userId).to.have.lengthOf(24)
            }))
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return authenticateUser('jon@snow.com', '1234')
            .catch(error => {
                errorThrown = error
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('User not found')
            })
    })

    it('fails on wrong password', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow.com',
                password: hash,
                role: 'provider'
            }))
            .then(() => authenticateUser('jon@snow.com', '12345'))
            .catch(error => {
                errorThrown = error
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('Wrong password')
            })
    })

    it('fails on invalid email', () => {
        let errorThrown

        try {
            authenticateUser('jonsnow.com', ' 1234')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('email is not valid')
        }
    })

    it('fails on invalid password', () => {
        let errorThrown

        try {
            authenticateUser('jon@snow.com', '12 34')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('password is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})


