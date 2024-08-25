import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { User } from '../data/index.js'
import updateDataUser from './updateDataUser.js'
import { NotFoundError, ContentError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

describe('updateDataUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on updating user data', () => {
        let user

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'ana',
                username: 'anany',
                email: 'ana@example.com',
                password: hash,
                avatar: 'avatars/.jpg',
                family: 'Casa'

            }))
            .then(createdUser => {
                user = createdUser

                const updates = {
                    username: 'anaUpdated',
                    email: 'anaUpdated@example.com',
                    avatar: 'avatars/.jpg'
                }

                return updateDataUser(user._id.toString(), updates)
            })
            .then(() => User.findById(user._id))
            .then(updatedUser => {
                expect(updatedUser).to.be.an('object')
                expect(updatedUser.username).to.equal('anaUpdated')
                expect(updatedUser.email).to.equal('anaUpdated@example.com')
                expect(updatedUser.avatar).to.equal('avatars/.jpg')
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown

        const updates = {
            username: 'maria',
            email: 'maria@example.com',
            avatar: 'avatars/.jpg'
        }

        return updateDataUser(new ObjectId().toString(), updates)
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('updates only the username', () => {
        let user

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'ana',
                username: 'ana',
                email: 'ana@example.com',
                password: hash,
                avatar: 'avatars/.jpg',
                family: 'Casa'
            }))
            .then(createdUser => {
                user = createdUser

                const updates = {
                    username: 'newUsername'
                }

                return updateDataUser(user._id.toString(), updates)
            })
            .then(() => User.findById(user._id))
            .then(updatedUser => {
                expect(updatedUser.username).to.equal('newUsername')
                expect(updatedUser.email).to.equal('ana@example.com')
                expect(updatedUser.avatar).to.equal('avatars/.jpg')
            })
    })

    it('updates only the email', () => {
        let user

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'ana',
                username: 'ana',
                email: 'ana@example.com',
                password: hash,
                avatar: 'avatars/.jpg',
                family: 'Casa'
            }))
            .then(createdUser => {
                user = createdUser

                const updates = {
                    email: 'new@email.com'
                }

                return updateDataUser(user._id.toString(), updates)
            })
            .then(() => User.findById(user._id))
            .then(updatedUser => {
                expect(updatedUser.username).to.equal('ana')
                expect(updatedUser.email).to.equal('new@email.com')
                expect(updatedUser.avatar).to.equal('avatars/.jpg')
            })
    })

    it('updates only the avatar', () => {
        let user

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'ana',
                username: 'ana',
                email: 'ana@example.com',
                password: hash,
                avatar: 'avatars/.jpg',
                family: 'Casa'
            }))
            .then(createdUser => {
                user = createdUser

                const updates = {
                    avatar: 'avatars/newAvatar.jpg'
                }

                return updateDataUser(user._id.toString(), updates)
            })
            .then(() => User.findById(user._id))
            .then(updatedUser => {
                expect(updatedUser.username).to.equal('ana')
                expect(updatedUser.email).to.equal('ana@example.com')
                expect(updatedUser.avatar).to.equal('avatars/newAvatar.jpg')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        const updates = {
            username: 'maria',
            email: 'maria@example.com',
            avatar: 'avatars/.jpg'
        }

        try {
            updateDataUser(12345, updates)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid username', () => {
        let errorThrown

        const updates = {
            username: 1234,
            email: 'maria@example.com',
            avatar: 'avatars/.jpg'
        }

        try {
            updateDataUser(new ObjectId().toString(), updates)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('username is not valid')
        }

    })

    it('fails on invalid email', () => {
        let errorThrown

        const updates = {
            username: 'Maria',
            email: 123456,
            avatar: 'avatars/.jpg'
        }
        try {
            updateDataUser(new ObjectId().toString(), updates)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('email is not valid')
        }

    })

    it('fails on invalid avatar', () => {
        let errorThrown

        const updates = {
            username: 'Maria',
            email: 'maria@example.com',
            avatar: 1234
        }
        try {
            updateDataUser(new ObjectId().toString(), updates)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('avatar is not valid')
        }

    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})