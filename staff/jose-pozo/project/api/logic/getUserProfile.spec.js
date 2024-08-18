import 'dotenv/config'

import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { NotFoundError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

import { User } from '../data/index.js'

import getUserProfile from './getUserProfile.js'

const { MONGODB_URL_TEST } = process.env


describe('get user profile', () => {

    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on get user profile', () =>
        bcrypt.hash('1234', 8)
            .then(hash => {
                return User.create({
                    name: 'Jon',
                    surname: 'Snow',
                    email: 'jon@snow.com',
                    password: hash,
                    role: 'provider'
                })
                    .then(user => {
                        return User.create({
                            name: 'Alfa',
                            surname: 'Beto',
                            email: 'alfa@beto.com',
                            role: 'customer',
                            manager: user.id
                        })
                            .then((userId, targetUserId) => getUserProfile(userId.id, targetUserId.id))
                            .then(userProfile => {
                                expect(userProfile).to.be.an('object')
                                // expect(userProfile.id).to.be.a('string')
                                expect(userProfile.name).to.be.a('string')
                                expect(userProfile.surname).to.be.a('string')
                                expect(userProfile.email).to.be.a('string')
                                expect(userProfile.role).to.be.a('string')
                                expect(userProfile.manager).to.be.an.instanceOf(ObjectId)
                            })
                    })
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow.com',
                password: hash,
                role: 'provider'
            }))
            .then((targetUserId) => getUserProfile(new ObjectId().toString(), targetUserId.id))
            .catch(error => {
                errorThrown = error
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('User not found')
            })
    })

    it('fails on non-existing target', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow.com',
                password: hash,
                role: 'provider'
            }))
            .then((userId) => getUserProfile(userId.id, new ObjectId().toString()))
            .catch(error => {
                errorThrown = error
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('Target user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getUserProfile(1234, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid targetId', () => {
        let errorThrown

        try {
            getUserProfile(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('targetUserId is not valid')
        }
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
