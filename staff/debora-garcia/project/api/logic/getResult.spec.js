import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"

import { User, Result, Workout } from "../data/index.js"
import { expect } from "chai"
import { ContentError, NotFoundError } from "com/errors.js"
import getResult from "./getResult.js"

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types


describe("getResult", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Result.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Result.deleteMany()]))


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
                .then(workout => Result.create({
                    workout: workout.id,
                    athlete: user.id,
                    time: 10,
                    repetitions: 10,
                    weight: 10,
                    date: Date.now()
                })
                    .then((result) => ({ user, result })))

            )

            .then(({ user, result }) => getResult(user.id, result.id))
            .then(result => {

                expect(result.id).to.equal(result.id.toString())

                expect(result.workout).to.be.an.instanceOf(Object)
                expect(result.athlete).to.be.an.instanceOf(Object)
                expect(result.time).to.be.equal(10)
                expect(result.repetitions).to.be.equal(10)
                expect(result.weight).to.be.equal(10)

                expect(result.date).to.be.instanceOf(Date)
            })
    )

    it("fails on non-existing user", () => {
        let errorThrown

        return getResult(new ObjectId().toString(), new ObjectId().toString())
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
            .then(user => getResult(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("result not found")
            })
    })

    it("fails on invalid user id", () => {
        let errorThrown
        try {
            getResult(1234, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }
    })

    it("fails on invalid result id", () => {
        let errorThrown
        try {
            getResult(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("resultId is not valid")
        }
    })

    after(() => Promise.all([User.deleteMany(), Result.deleteMany()]).then(() => mongoose.disconnect()))
})