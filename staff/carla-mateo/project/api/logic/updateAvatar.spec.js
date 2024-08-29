import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { User } from '../data/index.js'
import updateAvatar from './updateAvatar.js'
import { NotFoundError, ContentError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

debugger

describe('update Avatar', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on updating avatar', () => {
        let user

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'ana',
                username: 'ana',
                email: 'ana@example.com',
                password: hash,
                avatar: 'avatars/.png',
                family: 'Casa'
            }))
            .then(createdUser => {
                user = createdUser

                return updateAvatar(user._id.toString(), 'avatars/newAvatar.png')
            })
            .then(() => User.findById(user._id))
            .then(updatedUser => {
                expect(updatedUser.username).to.equal('ana')
                expect(updatedUser.email).to.equal('ana@example.com')
                expect(updatedUser.avatar).to.equal('avatars/newAvatar.png')
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return updateAvatar(new ObjectId().toString(), 'avatars/newAvatar.png')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            updateAvatar(12345, 'avatars/newAvatar.png')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid avatar', () => {
        let errorThrown

        try {
            updateAvatar(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('avatar is not valid')
        }

    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
