import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"

import getRandomWorkout from "./getRandomWorkout.js"
import { Post, Result, User, Workout } from "../data/index.js"
import { expect } from "chai"
import { ContentError, NotFoundError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe("getRandomWorkout", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Workout.deleteMany(), Result.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Workout.deleteMany(), Result.deleteMany()]))

    it("succeeds on getting a random workout", () => {
        let workoutType = "benchmark"

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }))
            .then((user) => {
                return Promise.all([Workout.create({
                    workoutType: workoutType,
                    title: "Fran",
                    rounds: 10,
                    movements: [],
                    duration: 10,
                    description: "descriptionTest1"
                }),
                Workout.create({
                    workoutType: workoutType,
                    title: "Murph",
                    rounds: 1,
                    movements: [],
                    duration: 60,
                    description: "descriptionTest2"
                })])
                    .then(() => user)
            })
            .then((user) => getRandomWorkout(user.id, workoutType))
            .then(workout => {
                expect(workout.workoutType).to.be.equal(workoutType)
                expect(workout.movements).to.be.an.instanceOf(Array)
                expect(workout.description).to.be.an.string
                if (workout.title === "Fran") {
                    expect(workout.rounds).to.be.equal(10)
                    expect(workout.duration).to.be.equal(10)
                    expect(workout.description).to.be.equal("descriptionTest1")
                } else if (workout.title === "Murph") {
                    expect(workout.rounds).to.be.equal(1)
                    expect(workout.duration).to.be.equal(60)
                    expect(workout.description).to.be.equal("descriptionTest2")
                }
            })
    })

    it("fails on non-existing user", () => {
        let errorThrown

        return getRandomWorkout(new ObjectId().toString(), "benchmark")
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.be.equal("user not found")
            })
    })

    it("fails on no workouts found for given workoutType", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }))
            .then((user) => getRandomWorkout(user.id, "for-time"))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.be.equal("workouts not found")
            })

    })

    it("fails when a movement is null or undefined", () => { 
    let errorThrown

    return bcrypt.hash("1234", 8)
    .then(hash => User.create({
        name: "nameTest",
        surname: "surnameTest",
        email: "test@gmail.com",
        username: "usernameTest",
        password: hash
    }))
    .then((user) => {
        return Promise.all([Workout.create({
            workoutType: "benchmark",
            title: "Fran",
            rounds: 10,
            movements: null,
            duration: 10,
            description: "descriptionTest1"
        }),
        Workout.create({
            workoutType: "benchmark",
            title: "Murph",
            rounds: 1,
            movements: null,
            duration: 60,
            description: "descriptionTest2"
        })])

            .then(() => user)
    })
    .then((user) => getRandomWorkout(user.id, "benchmark"))
        .catch(error => errorThrown = error)
        .finally(() => {
            expect(errorThrown).to.be.an.instanceOf(NotFoundError)
            expect(errorThrown.message).to.be.equal("movements not found")
        })
})

    it("fails on invalid user id", () => {
        let errorThrown
        try {
            getRandomWorkout(1234, "benchmark")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }
    })

    it("fails on invalid workoutType", () => {
        let errorThrown
        try {
            getRandomWorkout(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("workoutType is not valid")
        }
    })

    after(() => Promise.all([User.deleteMany(), Workout.deleteMany()]).then(() => mongoose.disconnect()))

})