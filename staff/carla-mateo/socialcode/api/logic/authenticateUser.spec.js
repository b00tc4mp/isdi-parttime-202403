import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/index.js'

import authenticateUser from './authenticateUser.js'
import { ContentError, CredentialsError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('authenticateUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({ name: 'coco', surname: 'cha', email: 'coco@cha.com', username: 'cococha', password: hash }))
            .then(() => authenticateUser('cococha', '1234'))
            .then(userId => {
                expect(userId).to.be.a.string
                expect(userId).to.have.lengthOf(24)
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        authenticateUser('AlgoDePrueba', '1234')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('❌ User not found ')
            })
    }
    )

    it('fails on existing user by wrong password', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'alba',
                surname: 'rico',
                email: 'alba@rico.com',
                username: 'albaricoque',
                password: hash
            }))
            .then(() => authenticateUser('albaricoque', 'otherPassword'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('❌ Wrong password')
            })
    })

    it('fails on invalid username', () => {
        let errorThrown

        try {
            authenticateUser(1234, "1234")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('❌ username is not valid')
        }
    })

    it('fails on invalid password', () => {
        let errorThrown

        try {
            authenticateUser('alwaysErrors', '123')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('❌ Password is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})

