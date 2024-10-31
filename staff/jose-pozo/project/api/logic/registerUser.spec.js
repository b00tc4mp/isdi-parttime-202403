import 'dotenv/config'

import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { DuplicityError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

import { User } from '../data/index.js'

import registerUser from './registerUser.js'

const { MONGODB_URL_TEST } = process.env


describe('register user', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on register user', () =>
        bcrypt.hash('1234', 8)
            .then(hash => {
                return registerUser('Jon', 'Snow', 'jon@snow.com', '1234', '1234')
                    .then(() => User.findOne({ email: 'jon@snow.com' }))
                    .then(user => {
                        expect(user).to.be.an('object')
                        expect(user._id).to.be.an.instanceOf(ObjectId)
                        expect(user.id).to.be.a('string')
                        expect(user.id).to.have.lengthOf(24)
                        expect(user.name).to.equal('Jon')
                        expect(user.surname).to.equal('Snow')
                        expect(user.email).to.equal('jon@snow.com')
                        expect(user.password).to.have.lengthOf(60)
                        expect(user.role).to.equal('provider')
                        expect(user.phone).to.equal('')
                        expect(user.appointments).to.be.an('array')
                        expect(user.appointments.length).to.equal(0)
                        expect(user.notes).to.be.an('array')
                        expect(user.notes.length).to.equal(0)
                        expect(user.services).to.be.an('array')
                        expect(user.services.length).to.equal(0)
                        return bcrypt.compare('1234', user.password)
                            .then(valid => { expect(valid).to.be.true })
                    })
            })
    )

    it('user already exists', () => {
        let errorThrown

        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow.com',
                password: hash,
                role: 'provider'
            }))
            .then(() => registerUser('Jon', 'Snow', 'jon@snow.com', '1234', '1234'))
            .catch((error) => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal('user already exists')
            })

    })

    it('fails on invalid name', () => {
        let errorThrown

        try {
            registerUser(1234, 'Snow', 'jon@snow.com', '1234', '1234')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('name is not valid')
        }
    })

    it('fails on invalid surname', () => {
        let errorThrown

        try {
            registerUser('Jon', 1234, 'jon@snow.com', '1234', '1234')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('surname is not valid')
        }
    })

    it('fails on invalid email', () => {
        let errorThrown

        try {
            registerUser('Jon', 'Snow', 'jonsow.com', '1234', '1234')
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
            registerUser('Jon', 'Snow', 'jon@snow.com', 1234, '1234')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('password is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
