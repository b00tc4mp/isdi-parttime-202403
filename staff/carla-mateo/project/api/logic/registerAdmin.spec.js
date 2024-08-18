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
        registerAdmin("carla", "casaPrueba", "carla@email.com", "1234", "1234")
            .then(() => User.findOne())
            .then(user => {
                expect(user.name).to.equal("carla")
                expect(user.username).to.equal("casaPrueba")
                expect(user.email).to.equal("carla@email.com")
                expect(user.role).to.equal("admin")

                return bcrypt.compare("1234", user.password)
            })
            .then((match) => expect(match).to.be.true)
    )


    it("fails on existing user", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({ name: "carla", username: "casaPrueba", email: "carla@email.com", password: hash }))
            .then(() => registerAdmin("carla", "casaPrueba", "carla@email.com", "1234", "1234"))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal("user already exists")
            })
    })

    it("fails on invalid name", () => {
        let errorThrown
        try {
            registerAdmin(1234, "casaPrueba", "carla@email.com", "1234", "1234")
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
            registerAdmin("carla", 1234, "carla@email.com", "1234")
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
            registerAdmin("carla", "casaPrueba", "carlaemail.com", "1234", "1234")
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
            registerAdmin("carla", "casaPrueba", "carla@email.com", 1234, "1234")
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
            registerAdmin("carla", "casaPrueba", "Mocha@Chai.com", "1234", 6666,)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(MatchError)
            expect(errorThrown.message).to.equal("password don\'t match")
        }
    })



    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
