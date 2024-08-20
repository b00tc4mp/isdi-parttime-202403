import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"

import getResults from "./getResults.js"
import { Post, Result, User, Workout } from "../data/index.js"
import { expect } from "chai"
import { ContentError, NotFoundError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe("getResults", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany(), Result.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Result.deleteMany()]))

    it("succeds on getting all results", () =>
        bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }))
            .then(user => Workout.create({
                workoutType: "benchmark",
                title: "Fran",
                rounds: 10,
                movements: [],
                duration: 10,
                description: "descriptionTest",
                userId: user.id
            })
                .then(workout =>
                    Result.create({
                        workout: workout.id,
                        athlete: user.id,
                        time: 10,
                        repetitions: 10,
                        weight: 10,
                        date: Date.now()
                    }))
                .then(() => user)
            )

            .then(user => getResults(user.id))
            .then(results => {
                expect(results).to.be.an.instanceOf(Array)
                expect(results).to.have.lengthOf(1)

                expect(results[0].workout).to.be.an.instanceOf(Object)
                expect(results[0].athlete).to.be.an.instanceOf(Object)
                expect(results[0].time).to.be.equal(10)
                expect(results[0].repetitions).to.be.equal(10)
                expect(results[0].weight).to.be.equal(10)
                expect(results[0].date).to.be.instanceOf(Date)
            })
    )
    it("fails on non-existing user", () => {
        let errorThrown

        return getResults(new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })

    })

    it("fails on non-existing results", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }))
            .then(user => getResults(user.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("you did't submit any result")
            })
    })

    it("fails on invalid user id", () => {
        let errorThrown
        try {
            getResults(1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }
    })

    after(() => Post.deleteMany().then(() => User.deleteMany().then(() => Result.deleteMany().then(() => mongoose.disconnect()))))

})