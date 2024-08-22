import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"
import { expect } from "chai"
import { Post, User, Result, Workout } from "../data/index.js"

import createPost from "./createPost.js"
import { NotFoundError, ContentError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe("createPost", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany(), Result.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Result.deleteMany()]))

    it("suceed on new post", () =>
        bcrypt.hash("1234", 8)
            .then(hash => {
                const user = new User({
                    name: "nameTest",
                    surname: "surnameTest",
                    email: "test@gmail.com",
                    username: "usernameTest",
                    password: hash
                })
                const workout = new Workout({
                    workoutType: "benchmark",
                    title: "Fran",
                    rounds: 10,
                    movements: [],
                    duration: 10,
                    description: "descriptionTest"
                })
                return Promise.all([user.save(), workout.save()])
            })
            .then(([user, workout]) =>
                createPost(user.id, workout.id, "http://test.com", "descriptionTest", 10, 10, 10, [], [])
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post.author.toString()).to.equal(user.id.toString())
                        expect(post.image).to.equal("http://test.com")
                        expect(post.workout.toString()).to.equal(workout.id.toString())

                        expect(post.description).to.equal("descriptionTest")
                        expect(post.likes).to.be.an("array")
                        expect(post.comments).to.be.an("array")
                        return Result.findById(post.result)
                    })
                    .then(result => {
                        expect(result.athlete.toString()).to.equal(result.athlete.toString())
                        expect(result.workout.toString()).to.equal(result.workout.toString())
                        expect(result.time).to.equal(10)
                        expect(result.repetitions).to.equal(10)
                        expect(result.weight).to.equal(10)
                    })
            )
    )

    it("fails on non-existing user", () => {
        let errorThrown

        return Workout.create({
            workoutType: "benchmark",
            title: "Fran",
            rounds: 10,
            movements: [],
            duration: 10,
            description: "descriptionTest"
        })
            .then((workout) => createPost(new ObjectId().toString(), workout.id, "http://test.com", "descriptionTest", 10, 10, 10, [], []))
            .catch((error) => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })
    })

    it("fails on invalid userId", () => {
        let errorThrown
        try {
            createPost(1234, new ObjectId().toString(), "http://test.com", "descriptionTest", 10, 10, 10, [], [])

        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }
    })
    it("fails on invalid workoutId", () => {
        let errorThrown
        try {
            createPost(new ObjectId().toString(), 1234, "http://test.com", "descriptionTest", 10, 10, 10, [], [])

        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("workoutId is not valid")
        }
    })
    it("fails on invalid image", () => {
        let errorThrown
        try {
            createPost(new ObjectId().toString(), new ObjectId().toString(), 1234, "descriptionTest", 10, 10, 10, [], [])

        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("image is not valid")
        }
    })

    it("fails on invalid description", () => {
        let errorThrown
        try {
            createPost(new ObjectId().toString(), new ObjectId().toString(), "http://test.com", 1234, 10, 10, 10, [], [])

        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("description is not valid")
        }
    })

    it("fails on invalid time", () => {
        let errorThrown
        try {
            createPost(new ObjectId().toString(), new ObjectId().toString(), "http://test.com", "descriptionTest", "10", 10, 10, [], [])

        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("time is not valid")
        }
    })
    it("fails on invalid repetitions", () => {
        let errorThrown
        try {
            createPost(new ObjectId().toString(), new ObjectId().toString(), "http://test.com", "descriptionTest", 10, "10", 10, [], [])

        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("repetitions is not valid")
        }
    })
    it("fails on invalid weight", () => {
        let errorThrown
        try {
            createPost(new ObjectId().toString(), new ObjectId().toString(), "http://test.com", "descriptionTest", 10, 10, "10", [], [])

        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceof(ContentError)
            expect(errorThrown.message).to.equal("weight is not valid")
        }
    })
    it("succeeds with missing optional parameters", () =>
        bcrypt.hash("1234", 8)
            .then(hash => {
                const user = new User({
                    name: "nameTest",
                    surname: "surnameTest",
                    email: "test@gmail.com",
                    username: "usernameTest",
                    password: hash
                })
                const workout = new Workout({
                    workoutType: "benchmark",
                    title: "Fran",
                    rounds: 10,
                    movements: [],
                    duration: 10,
                    description: "descriptionTest"
                })
                return Promise.all([user.save(), workout.save()])
            })
            .then(([user, workout]) =>
                createPost(user.id, workout.id, null, "descriptionTest", null, null, null, [], [])
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post.author.toString()).to.equal(user.id.toString())
                        expect(post.image).to.be.null 
                        expect(post.workout.toString()).to.equal(workout.id.toString())

                        expect(post.description).to.equal("descriptionTest")
                        expect(post.likes).to.be.an("array")
                        expect(post.comments).to.be.an("array")
                        return Result.findById(post.result)
                    })
                    .then(result => {
                        expect(result.athlete.toString()).to.equal(result.athlete.toString())
                        expect(result.workout.toString()).to.equal(result.workout.toString())
                        expect(result.time).to.equal(null) 
                        expect(result.repetitions).to.equal(null) 
                        expect(result.weight).to.equal(null) 
                    })
            )
    )


    after(() => Post.deleteMany().then(() => User.deleteMany().then(() => Result.deleteMany().then(() => mongoose.disconnect()))))
})