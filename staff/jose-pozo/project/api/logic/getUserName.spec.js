import 'dotenv/config'

import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { NotFoundError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

import { User } from '../data/index.js'

import getUserName from './getUserName.js'

const { MONGODB_URL_TEST } = process.env


describe('get user name', () => {

    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on get user name', () =>
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
                            .then(() => getUserName(user.id, user.id))
                            .then(userName => {
                                expect(userName).to.be.a('string')
                                expect(userName).to.have.lengthOf(3)
                            })
                    })
            }))


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
            .then((targetUserId) => getUserName(new ObjectId().toString(), targetUserId.id))
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
            .then((userId) => getUserName(userId.id, new ObjectId().toString()))
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
            getUserName(1234, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('user id is not valid')
        }
    })

    it('fails on invalid targetUserId', () => {
        let errorThrown

        try {
            getUserName(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('target id is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
