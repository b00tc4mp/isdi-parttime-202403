import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { User } from '../data/index.js'
import updateUsername from './updateUsername.js'
import { NotFoundError, ContentError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

describe('update Username', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on updating username', () => {
        let user

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'ana',
                username: 'ana',
                email: 'ana@email.com',
                password: hash,
                avatar: 'avatars/.jpg',
                family: 'Casa'
            }))
            .then(createdUser => {
                user = createdUser

                return updateUsername(user._id.toString(), 'newAna')
            })
            .then(() => User.findById(user._id))
            .then(updatedUser => {
                expect(updatedUser.username).to.equal('newAna')
                expect(updatedUser.email).to.equal('ana@email.com')
                expect(updatedUser.avatar).to.equal('avatars/.jpg')
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return updateUsername(new ObjectId().toString(), 'ana')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            updateUsername(12345, 'ana')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid username', () => {
        let errorThrown

        try {
            updateUsername(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('username is not valid')
        }
    })
    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})