import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

import { expect } from "chai"

import { User } from "../data/index.js"

import registerUser from "./registerUser.js"
import { ContentError, DuplicityError, MatchError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

describe("registerUser", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany))
    beforeEach(() => User.deleteMany())

    it("suceeds on new user", () =>
        registerUser("nameTest", "surnameTest", "test@gmail.com", "usernameTest", "1234", "1234")
            .then(() => User.findOne())
            .then(user => {
                expect(user.name).to.equal("nameTest")
                expect(user.surname).to.equal("surnameTest")
                expect(user.email).to.equal("test@gmail.com")
                expect(user.username).to.equal("usernameTest")

                return bcrypt.compare("1234", user.password)
            })
            .then(passwordMatch => expect(passwordMatch).to.be.true)
    )

    it("fails on existing user", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }))
            .then(() => registerUser("nameTest", "surnameTest", "test@gmail.com", "usernameTest", "1234", "1234"))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(DuplicityError)
                expect(errorThrown.message).to.equal("user already exists")
            })
    })

    it("fails on invalid name", () => {
        let errorThrown

        try {
            registerUser(1234, "surnameTest", "test@gmail.com", "usernameTest", "1234", "1234")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("name is not valid")
        }
    })


    it("fails on invalid surname", () => {
        let errorThrown

        try {
            registerUser("nameTest", 1234, "test@gmail.com", "usernameTest", "1234", "1234")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("surname is not valid")
        }
    })

    it("fails on invalid email", () => {
        let errorThrown

        try {
            registerUser("nameTest", "surnameTest", "mail", "usernameTest", "1234", "1234")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("email is not valid")
        }
    })

    it("fails on invalid username", () => {
        let errorThrown

        try {
            registerUser("nameTest", "surnameTest", "test@gmail.com", 1234, "1234", "1234")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("username is not valid")
        }
    })

    it("fails on invalid password", () => {
        let errorThrown
        try {
            registerUser("nameTest", "surnameTest", "test@gmail.com", "usernameTest", 1234, "1234")
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
            registerUser("nameTest", "surnameTest", "test@gmail.com", "usernameTest", "1234", 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(MatchError)
            expect(errorThrown.message).to.equal("passwords don\'t match")
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})