import "dotenv/config"
import { mongoose, Types } from "mongoose"
import bcrypt from "bcryptjs"

import { expect } from "chai"

import { User } from "../data/index.js"

import registerUser from "./registerUser.js"
import { ContentError, NotFoundError, DuplicityError } from "com/errors.js"

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env


describe("registerUser", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it("succeeds on new user", () =>
        bcrypt.hash("1234", 8)
            .then(hash => User.create({ name: "CASA", username: "carla", email: "carla@email.com", password: hash, avatar: "avatars/.jpg", family: "familyOne" }))
            .then((user) =>
                registerUser(user.id, "CASA", "jordi", "jordi@email.com", "1234", "avatars/.jpg", "familyOne")
                    .then(() => User.findOne({ email: "jordi@email.com" }))
                    .then(user => {
                        expect(user._id).to.be.instanceOf(ObjectId)
                        expect(user.name).to.equal("CASA")
                        expect(user.username).to.equal("jordi")
                        expect(user.email).to.equal("jordi@email.com")
                        expect(user.avatar).to.equal("avatars/.jpg")
                        expect(user.family).to.equal("familyOne")

                        return bcrypt.compare("1234", user.password)
                    })
                    .then((match) => expect(match).to.be.true)
            )
    )


    it("fails on non-existing user", () => {
        let errorThrown

        return registerUser(new ObjectId().toString(), "jordi", "casaPrueba", "jordi@email.com", "1234", "avatars/.jpg", "familyOne")
            .catch((error) => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })
    })

    it("fails on existing user", () => {
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
            .then((user) => registerUser(user.id.toString(), "jordi", "casaPrueba", "jordi@email.com", "1234", "avatars/.jpg", "familyOne"))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal("user already exists")
            })
    })

    it("fails on invalid id", () => {
        let errorThrown
        try {
            registerUser(1234, "jordi", "casaPrueba", "jordi@email.com", "1234", "avatars/.jpg", "familyOne")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("id is not valid")
        }
    })

    it("fails on invalid name", () => {
        let errorThrown
        try {
            registerUser(new ObjectId().toString(), 1234, "casaPrueba", "jordi@email.com", "1234", "avatars/.jpg", "familyOne")
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
            registerUser(new ObjectId().toString(), "jordi", 1234, "jordi@email.com", "1234", "avatars/.jpg", "familyOne")
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
            registerUser(new ObjectId().toString(), "jordi", "casaPrueba", "jordiemail.com", "1234", "avatars/.jpg", "familyOne")
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
            registerUser(new ObjectId().toString(), "silvia", "casaPrueba", "silvia@email.com", 1234, "avatars/.jpg", "familyOne")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("password is not valid")
        }
    })

    it("fails on invalid avatar", () => {
        let errorThrown
        try {
            registerUser(new ObjectId().toString(), "jordi", "casaPrueba", "jordi@email.com", "1234", "avat/.jpg", "familyOne")
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
            registerUser(new ObjectId().toString(), "CASA", "jordi", "jordi@email.com", "1234", "avatars/.jpg", 123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("text is not valid")
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
