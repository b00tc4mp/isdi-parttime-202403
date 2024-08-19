import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

import { expect } from "chai"

import { User } from "../data/index.js"

import registerAdmin from "./registerAdmin.js"
import { ContentError, DuplicityError, MatchError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env


describe("registerAdmin", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it("succeeds on new user", () =>
        registerAdmin("casaPrueba", "carla", "carla@email.com", "1234", "1234", "avatars/.jpg", "familyOne")
            .then(() => User.findOne())
            .then(user => {
                expect(user.name).to.equal("casaPrueba")
                expect(user.username).to.equal("carla")
                expect(user.email).to.equal("carla@email.com")
                expect(user.role).to.equal("admin")
                expect(user.avatar).to.equal("avatars/.jpg")
                expect(user.family).to.equal("familyOne")

                return bcrypt.compare("1234", user.password)
            })
            .then((match) => expect(match).to.be.true)
    )


    it("fails on existing admin", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "jordi",
                username: "casaPrueba",
                email: "jordi@email.com",
                password: hash,
                avatar: "avatars/.jpg",
                family: "familyOne"
            }))
            .then((user) => registerAdmin("jordi", "casaPrueba", "jordi@email.com", "1234", "1234", "avatars/.jpg", "familyOne"))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal("admin already exists")
            })
    })

    it("fails on invalid name", () => {
        let errorThrown
        try {
            registerAdmin(1234, "casaPrueba", "carla@email.com", "1234", "1234", "avatars/.jpg", "familyOne")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("name is not valid")
        }
    })

    it("fails on invalid username", () => {
        let errorThrown
        try {
            registerAdmin("carla", 1234, "carla@email.com", "1234", "avatars/.jpg", "familyOne")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("username is not valid")
        }
    })

    it("fails on invalid email", () => {
        let errorThrown
        try {
            registerAdmin("carla", "casaPrueba", "carlaemail.com", "1234", "1234", "avatars/.jpg", "familyOne")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("email is not valid")
        }
    })

    it("fails on invalid password", () => {
        let errorThrown
        try {
            registerAdmin("carla", "casaPrueba", "carla@email.com", 1234, "1234", "avatars/.jpg", "familyOne")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("password is not valid")
        }
    })

    it("fails on non-matching password repeat", () => {
        let errorThrown
        try {
            registerAdmin("carla", "casaPrueba", "carla@email.com", "1234", 6666, "avatars/.jpg", "familyOne")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(MatchError)
            expect(errorThrown.message).to.equal("password don\'t match")
        }
    })

    it("fails on invalid avatar", () => {
        let errorThrown
        try {
            registerAdmin("carla", "casaPrueba", "carla@email.com", "1234", "1234", "avat/.jpg", "familyOne")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("avatar is not valid")
        }
    })

    it("fails on invalid family", () => {
        let errorThrown
        try {
            registerAdmin("CASA", "jordi", "jordi@email.com", "1234", "1234", "avatars/.jpg", 123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("text is not valid")
        }
    })



    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
