import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"

import { User, Post, Comment } from "../data/index.js"
import { expect } from "chai"
import { ContentError, NotFoundError } from "com/errors.js"
import getAllComments from "./getAllComments.js"

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe("getPosts", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]))

    it("suceeds on getting all comments", () => {

        return bcrypt.hash("1234", 8)
            .then(hash => {
                const user = new User({
                    name: "nameTest",
                    surname: "surnameTest",
                    email: "test@gmail.com",
                    username: "usernameTest",
                    password: hash
                })
                const post = new Post({

                    author: user.id,
                    image: "http://test.com",
                    workout: new ObjectId().toString(),
                    result: new ObjectId().toString(),
                    description: "descriptionTest",
                    likes: []

                })
                const comment = new Comment({

                    author: user.id,
                    post: post.id,
                    text: "commentTest",

                })

                return Promise.all([user.save(), post.save(), comment.save()])

            })
            .then(([user, post]) =>
                getAllComments(user.id, post.id)
                    .then(comments => {
                        expect(comments).to.be.an.instanceOf(Array)
                        expect(comments).to.have.lengthOf(1)
                        expect(comments[0].text).to.equal("commentTest")
                        expect(comments[0].author).to.be.an.instanceOf(Object)
                        expect(comments[0].post).to.be.an.instanceOf(Object)

                    })
            )

    })

    it("succeeds in returning an empty array when there are no comments", () => {
        return bcrypt.hash("1234", 8)
            .then(hash => {
                const user = new User({
                    name: "nameTest",
                    surname: "surnameTest",
                    email: "test@gmail.com",
                    username: "usernameTest",
                    password: hash
                })
                const post = new Post({

                    author: user.id,
                    image: "http://test.com",
                    workout: new ObjectId().toString(),
                    result: new ObjectId().toString(),
                    description: "descriptionTest",
                    likes: []

                })
                return Promise.all([user.save(), post.save()])
            })
            .then(([user, post]) =>
                getAllComments(user.id, post.id)
                    .then(comments => {
                        expect(comments).to.be.an.instanceOf(Array)
                        expect(comments).to.have.lengthOf(0)
                        expect(comments).to.be.empty
                    })
            )
    })

    it("fails on non-existing user", () => {
        let errorThrown

        return getAllComments(new ObjectId().toString(), new ObjectId().toString())
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
            .then(user => getAllComments(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.be.equal("post not found")
            })
    })

    it("fails on invalid userId", () => {
        let errorThrown

        try {
            getAllComments(1234, new ObjectId().toString())
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }

    })

    it("fails on invalid postId", () => {
        let errorThrown

        try {
            getAllComments(new ObjectId().toString(), 12345)

        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("postId is not valid")
        }
    })

    after(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]).then(() => mongoose.disconnect()))

})