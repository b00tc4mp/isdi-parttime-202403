import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

import { expect } from "chai"

import { User } from "../data/models/index.js"

import registerUser from "./registerUser.js"
import { ContentError, DuplicityError, MatchError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env


describe('registerUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeds on register user', () =>
        registerUser(
            "Mocha",
            "Chai",
            "Mocha@Chai.com",
            "MochaChai",
            '123123123',
            '123123123'
        )
            .then(() => User.findOne())
            .then(user => {
                console.log(user) // Agrega esto para depuración
                expect(user.name).to.equal('Mocha')
                expect(user.surname).to.equal('Chai')
                expect(user.email).to.equal('Mocha@Chai.com')
                expect(user.username).to.equal('MochaChai')

                return bcrypt.compare('123123123', user.password)
            })
            .then(match => expect(match).to.be.true)
    )


    it("fails on existing user", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({ name: "Mocha", surname: "Chai", email: "Mocha@Chai.com", username: "MochaChai", password: hash }))
            .then(() => registerUser("Mocha", "Chai", "Mocha@Chai.com", "MochaChai", "1234", "1234"))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal("username already exists")
            })
    })

    it("fails on invalid name", () => {
        let errorThrown
        try {
            registerUser(1234, "Chai", "Mocha@Chai.com", "MochaChai", "1234", "1234")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("name is not valid")
        }
    })

    it("fails on invalid surname", () => {
        let errorThrown
        try {
            registerUser("Mocha", 1234, "Mocha@Chai.com", "MochaChai", "1234", "1234")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("surname is not valid")
        }
    })

    it("fails on invalid email", () => {
        let errorThrown
        try {
            registerUser("Mocha", "Chai", "MochaChai.com", "MochaChai", "1234", "1234")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("email is not valid")
        }
    })

    it("fails on invalid username", () => {
        let errorThrown
        try {
            registerUser("Mocha", "Chai", "Mocha@Chai.com", 1234, "1234", "1234")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("username is not valid")
        }
    })

    it("fails on invalid password", () => {
        let errorThrown
        try {
            registerUser("Mocha", "Chai", "Mocha@Chai.com", "MochaChai", 1234, "1234")
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
            registerUser("Mocha", "Chai", "Mocha@Chai.com", "MochaChai", "1234", 6666)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(MatchError)
            expect(errorThrown.message).to.equal("passwords don\'t match")
        }
    })



    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})