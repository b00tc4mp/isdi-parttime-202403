import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { User, Post } from '../data/models/index.js'

import getUserName from './getUserName.js'

import { NotFoundError, ContentError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('getUserName', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST)
        .then(() => User.deleteMany().then(Post.deleteMany()))
    )

    beforeEach(() => User.deleteMany())


    it('succeds get userName from existing user', () =>
        bcrypt.hash('123123123', 8)
            .then(hash =>
                Promise.all([User.create({
                    name: "Mocha",
                    surname: "Chai",
                    email: "Mocha@Chai.com",
                    username: "MochaChai",
                    password: hash
                }),
                User.create({
                    name: "Test",
                    surname: "test",
                    email: "Mocha@test.com",
                    username: "Testtest",
                    password: hash
                })
                ])
            )
            .then(([user, targetUser]) => getUserName(user.id, targetUser.id)
                .then(name => {
                    expect(name).to.be.a.string
                    expect(name).to.equal('Test')
                })
            )
    )


    it('fails on non-existing user', () => {
        let errorThrown
        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({
                name: "Mocha",
                surname: "Chai",
                email: "Mocha@Chai.com",
                username: "MochaChai",
                password: hash
            }))
            .then(targetUserId => getUserName(new ObjectId().toString(), targetUserId.id,))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing targetUser', () => {
        let errorThrown
        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({
                name: "Test",
                surname: "test",
                email: "Mocha@test.com",
                username: "Testtest",
                password: hash
            }))
            .then(user => getUserName(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('targetUser not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getUserName(7777, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid targetUserId', () => {
        let errorThrown

        try {
            getUserName(new ObjectId().toString(), 7777)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('targetUserId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
