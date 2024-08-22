import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { User } from '../data/index.js'
import editUsername from './editUsername.js'
import { ContentError, DuplicityError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('editUsername', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds in changing the username for an existing user', () => {
        let user
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Master',
                surname: 'Chef',
                email: 'master@chef.com',
                username: 'masterchef',
                password: hash
            }))
            .then((createdUser) => {
                user = createdUser
                return editUsername(user._id.toString(), 'newusername')
            })
            .then(updateUser => {
                expect(updateUser).to.exist
                expect(updateUser.username).to.equal('newusername')
            })

    })

    it('fails when the user does not exists', () => {
        let errorThrown

        return editUsername(new ObjectId().toString(), 'newusername')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('User not found')
            })
    })

    it('fails when the user already exists', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => Promise.all([
                User.create({
                    name: 'Master',
                    surname: 'Chef',
                    email: 'master@chef.com',
                    username: 'masterchef',
                    password: hash
                }),
                User.create({
                    name: 'Maestro',
                    surname: 'Rata',
                    email: 'maestro@rata.com',
                    username: 'maestrorata',
                    password: hash
                })
            ]))
            .then(([user, existingUser]) => {
                return editUsername(user._id.toString(), existingUser.username)
                    .catch(error => {
                        errorThrown = error
                    })
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal('Username already exist')
            })
    })


    it('fails with an invalid userId', () => {
        let errorThrown

        try {
            editUsername('invalidUserId', 'username')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })


    it('fails with an invalid username', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Master',
                surname: 'Chef',
                email: 'master@chef.com',
                username: 'masterchef',
                password: hash
            }))
            .then(user => {
                try {
                    return editUsername(user._id.toString(), '')
                } catch (error) {
                    errorThrown = error
                } finally {
                    expect(errorThrown).to.be.an.instanceOf(ContentError)
                    expect(errorThrown.message).to.equal('username is not valid')

                }
            })
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})