import "dotenv/config"
import { User } from "../data/index.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import { Types } from "mongoose"

import { CredentialsError, ContentError, NotFoundError } from "com/errors.js"
import getUsername from "./getUsername.js"
import { expect } from "chai"

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe("getUsername", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
    beforeEach(() => User.deleteMany())
    it("succeeds get username from existing user", () => {
        bcrypt.hash("1234", 8)
            .then(hash => Promise.all([User.create({
                email: "test@test.com",
                username: "ChaiMocha",
                password: hash
            }),
            User.create({
                email: "test2@test.com",
                username: "ChaiMocha2",
                password: hash

            })]))
            .then(([user, targetUser]) => getUsername(user.id, targetUser.id))
            .then(username => {
                expect(username).to.be.a.string
                expect(username).to.be.equal("ChaiMocha2")
            })
    })

    it("fails on non-existing user", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({ username: "ChaiMocha", email: "test@test.com", password: hash }))
            .then(targetUserId => getUsername(new ObjectId().toString(), targetUserId.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })
    })

    it("fails on non-existing targetUser", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({ username: "ChaiMocha", email: "test@test.com", password: hash }))
            .then(user => getUsername(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("targetUsername not found")
            })
    })

    it("fails on invalid userID", () => {
        let errorThrown

        try {
            getUsername(12345, new ObjectId().toString())

        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }
    })

    it("fails on invalid targetUserId", () => {
        let errorThrown

        try {
            getUsername(new ObjectId().toString(), 12345)

        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("targetUserId is not valid")
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})
