import "dotenv/config"
import mongoose, { get, Types } from "mongoose"

import bcrypt from "bcryptjs"


import getUserName from "./getUserName.js"
import { User } from "../data/index.js"
import { NotFoundError, ContentError } from "com/error.js"

import { expect } from "chai"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

// npm run test-inspect

describe('getUserName', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
    beforeEach(() => User.deleteMany())

    it('succeeds get username from existing user', () =>
        bcrypt.hash('123132123', 8)
            .then(hash => Promise.all([User.create({
                name: "Mocha",
                surname: "Chai",
                email: "Mocha@Chai.com",
                username: "MochaChai",
                password: hash
            }), User.create({
                name: "Test",
                surname: "User",
                email: "test@user.com",
                username: "testuser",
                password: hash
            })]))
            .then(([user, targetUser]) => getUserName(user.id, targetUser.id))
            .then(name => {
                expect(name).to.be.a.string
                expect(name).to.be.equal('Test')
            })

    )

    it("fails on non-existing user", () => {
        let errorThrown

        return bcrypt.hash("321321321", 8)
            .then(hash => User.create({
                name: 'Mocha', surname: 'Chai', email: 'mocha@chai.com', username: 'machachai',
                password: hash
            }))
            .then(targetUserId => getUserName(new ObjectId().toString(), targetUserId.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("User not found")
            })
    })

    it('fails on non-existing targetUser', () => {
        let errorThrown

        return bcrypt.hash('123456789', 8)
            .then(hash => User.create({
                name: 'Mocha', surname: 'Chai', email: 'mocha@chai.com', username: 'machachai',
                password: hash
            }))
            .then(user => getUserName(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('TargetUser not found')
            })
    })

    // it('fails on invalid userId', () => {
    //     let errorThrown

    //     try {
    //         getUserName(123456789, new ObjectId().toString())
    //     } catch (error) {
    //         errorThrown = error
    //     } finally {
    //         expect(errorThrown).to.be.instanceOf(ContentError)
    //         expect(errorThrown.message).to.equal('userId is not valid')
    //     }
    // })

    // it('fails on invalid targetUserid', () => {
    //     let errorThrown

    //     try {
    //         getUserName(new ObjectId().toString(), 123456789)
    //     } catch (error) {
    //         errorThrown = error
    //     } finally {
    //         expect(errorThrown).to.be.instanceOf(ContentError)
    //         expect(errorThrown.message).to.equal('targetUserId is not valid')
    //     }
    // })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})