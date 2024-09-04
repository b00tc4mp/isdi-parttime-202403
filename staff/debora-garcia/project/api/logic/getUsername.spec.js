import "dotenv/config"
import mongoose from "mongoose"
import { Types } from "mongoose"
import bcrypt from "bcryptjs"

import getUsername from "./getUsername.js"
import { User } from "../data/index.js"
import { NotFoundError, ContentError } from "com/errors.js"

import { expect } from "chai"

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types


describe("getUsername", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it("suceeds get username from existent user", () => {
        return bcrypt.hash("1234", 8)
            .then(hash => Promise.all([User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }), User.create({
                name: "target",
                surname: "surnameTarget",
                email: "target@gmail",
                username: "targetUser",
                password: hash
            })]))
            .then(([user, target]) => getUsername(user.id, target.id))
            .then(name => {
                expect(name).to.be.a.string
                expect(name).to.be.equal("targetUser")
            })
    })

    it("fails on non-existing user", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }))
            .then(targetUser => getUsername(new ObjectId().toString(), targetUser.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.be.equal("user not found")
            })
    })

    it("fails on non-existing target user", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }))
            .then(user => getUsername(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.be.equal("targetUsername not found")
            })
    })

    it("fails on invalid user id", () => {
        let errorThrown
        try {
            getUsername(1234, new ObjectId().toString())

        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }
    })

    it("fails on invalid target user id", () => {
        let errorThrown
        try {
            getUsername (new ObjectId().toString(), 1234)

} catch (error) {
    errorThrown = error
} finally {
    expect(errorThrown).to.be.an.instanceof(ContentError)
    expect(errorThrown.message).to.equal("targetUserId is not valid")
}
    })


after(() => User.deleteMany().then(() => mongoose.disconnect()))

})

