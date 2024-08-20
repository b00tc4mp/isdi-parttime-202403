import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"

import getPosts from "./getPosts.js"
import { Post, Result, User, Workout } from "../data/index.js"
import { expect } from "chai"
import { ContentError, NotFoundError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types


describe("getPosts", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany(), Result.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Result.deleteMany()]))

    it("suceeds on getting all posts", () =>
        bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }))
            .then((user) => Workout.create({
                workoutType: "benchmark",
                title: "Fran",
                rounds: 10,
                movements: [],
                duration: 10,
                description: "descriptionTest"
            })
                .then((workout) => Result.create({
                    workout: workout.id,
                    athlete: user.id,
                    time: 10,
                    repetitions: 10,
                    weight: 10
                })
                    .then((result) => Post.create({
                        author: user.id,
                        workout: workout.id,
                        result: result.id,
                        image: "http://test.com",
                        description: "descriptionTest",
                        time: 10,
                        repetitions: 10,
                        weight: 10,
                        likes: [],
                        comments: []
                    })))
                .then(() => user)
            )
            .then((user) => getPosts(user.id))
            .then(posts => {
                expect(posts).to.be.an.instanceOf(Array)
                expect(posts).to.have.lengthOf(1)

                expect(posts[0].author).to.be.an.instanceOf(Object)
                expect(posts[0].image).to.equal("http://test.com")
                expect(posts[0].workout).to.be.an.instanceOf(Object)
                expect(posts[0].result).to.be.an.instanceOf(Object)
                expect(posts[0].description).to.equal("descriptionTest")
        
                expect(posts[0].likes).to.be.an.instanceOf(Array)
                expect(posts[0].comments).to.be.an.instanceOf(Array)
            })
    )

    it("fails on non-existing user", () => {
        let errorThrown

        return getPosts(new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.be.equal("user not found")
            })
    })

    it("fails on non-existing post", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }))
            .then(user => getPosts(user.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.be.equal("there are no posts yet")
            })
    })

    it("fails on invalid user id", () => {
        let errorThrown
        try {
            getPosts(1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }
    })
    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
})
