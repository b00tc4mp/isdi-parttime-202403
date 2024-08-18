import "dotenv/config"
import mongoose, { Types } from "mongoose"

import bcrypt from "bcryptjs"

import getUsername from "./getUserame.js"
import { User } from "../data/index.js"
import { NotFoundError, ContentError } from "com/errors.js"

import { expect } from "chai"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

debugger

describe("getUsername", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it("succeeds get userName from existing user", () =>
        bcrypt.hash("1234", 8)
            .then(hash => Promise.all([User.create({
                name: "casaUno",
                username: "carla",
                email: "carla@email.com",
                password: hash
            }), User.create({
                name: "casaUno",
                username: "judith",
                email: "judith@email.com",
                password: hash
            })]))
            .then(([user, targetUser]) => getUsername(user.id, targetUser.id))
            .then(user => {
                expect(user).to.be.a.string
                expect(user.id).to.be.a.string
                expect(user.name).to.be.equal("casaUno")
                expect(user.username).to.be.equal("carla")
                expect(user.email).to.be.equal("carla@email.com")
                expect(user.parent).to.be.equal(user.id)
            })
    )
    it("fails on non-existing user", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({ name: "casa", username: "carla", email: "carla@email.es", password: hash }))
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
            .then(hash => User.create({ name: "casa", username: "hugo", email: "hugo@email.es", password: hash }))
            .then(user => getUsername(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })
    })
    it("fails on invalid userId", () => {
        let errorThrown

        try {
            getUsername(1357, new ObjectId().toString())
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
            getUsername(new ObjectId().toString(), 2468)
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("targetUserId is not valid")
        }
    })
    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})