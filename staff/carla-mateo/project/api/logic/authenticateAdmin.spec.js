import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import { ContentError, CredentialsError, NotFoundError } from 'com/errors.js'
import authenticateAdmin from './authenticateAdmin.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('authenticateAdmin', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'CASA',
                username: 'carla',
                email: 'carla@email.com',
                password: hash,
                role: 'admin',
                family: 'casa'
            }))
            .then(() => authenticateAdmin('carla', '1234'))
            .then((result) => {
                expect(result).to.be.an('object')
                expect(result.id).to.be.a('string')
                expect(result.id).to.not.be.null
                expect(result.id).to.not.be.undefined
                expect(result.id.length).to.equal(24)
                expect(result.role).to.be.a('string')
                expect(result.role).to.equal('admin')
                expect(result.role).to.not.be.undefined
                expect(result.role).to.not.be.null
                expect(result.role.length).to.equal(5)
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return authenticateAdmin('usernameNonExistent', '1234')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on existing user by wrong password', () => {
        let errorThrown
        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'CASA',
                username: 'hugo',
                email: 'hugo@email.com',
                password: hash,
                family: 'casa'
            }))
            .then(() => authenticateAdmin('hugo', 'otherPassword'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('wrong password')
            })
    })

    it('fails on invalid username', () => {
        let errorThrown
        try {
            authenticateAdmin(1234, '1234')
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
            authenticateAdmin('alwaysErrors', '123')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('password is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
