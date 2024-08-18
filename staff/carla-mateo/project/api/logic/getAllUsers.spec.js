import "dotenv/config"
import mongoose, { Types } from "mongoose"

import bcrypt from "bcryptjs"
import { expect } from "chai"

import { User } from "../data/index.js"
import getAllUsers from "./getAllUsers.js"
import { NotFoundError, ContentError } from "com/errors.js"

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env


describe("getAllUsers", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
    beforeEach(() => User.deleteMany())

    it("suceeds on get all Users", () =>
        bcrypt.hash("1234", 8)
            .then(hash => {
                return User.create({
                    name: "CASA",
                    username: "carla",
                    email: "carla@pemail.com",
                    password: hash,
                    role: "admin"

                })
                    .then(user => {
                        return User.create({
                            name: "CASA",
                            username: "judiht",
                            email: "judith@email.com",
                            password: hash,
                            parent: user.id.toString(),
                            role: "user"
                        })
                            .then(() => getAllUsers(user.id.toString()))
                            .then((users) => {
                                expect(users).to.be.an.instanceOf(Array)
                                expect(users[0]).to.be.an.instanceOf(Object)
                                expect(users[0].name).to.be.equal("CASA")
                                expect(users[0].username).to.be.equal("judiht")
                                expect(users[0].email).to.be.equal("judith@email.com")
                                expect(users[0].parent).to.be.equal(user.id.toString())
                            })
                    })
            })
    )

    it("fails on non-existing user", () => {
        let errorThrown

        return getAllUsers(new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })
    })

    it("fails on non-existing parent", () => {
        let errorThrown

        return User.create({
            name: "casaDos",
            username: "carla",
            email: "carla@pemail.com",
            password: "1234",
            role: "admin",
        })

            .then((user) => getAllUsers(user.id.toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("parent not found")
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getAllUsers(1234, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})


