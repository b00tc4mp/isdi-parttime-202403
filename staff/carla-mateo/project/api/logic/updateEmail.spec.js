import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { User } from '../data/index.js'
import updateEmail from './updateEmail.js'
import { NotFoundError, ContentError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

describe('update Email', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on updating email', () => {
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

                return updateEmail(user._id.toString(), 'new@email.com')
            })
            .then(() => User.findById(user._id))
            .then(updatedUser => {
                expect(updatedUser.username).to.equal('ana')
                expect(updatedUser.email).to.equal('new@email.com')
                expect(updatedUser.avatar).to.equal('avatars/.jpg')
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return updateEmail(new ObjectId().toString(), 'maria@example.com')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            updateEmail(12345, 'maria@example.com')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid email', () => {
        let errorThrown


        try {
            updateEmail(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('email is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})