import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"
import { expect } from "chai"
import { Post, User, Comment } from "../data/index.js"

import createComment from "./createComment.js"
import { NotFoundError, ContentError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe("crateComment", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]))

    it("suceeds on new post comment", () => {

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
                createComment(user.id, post.id, "commentTest")
                    .then(() => Comment.findOne())
                    .then(comment => {
                        expect(comment.author.toString()).to.equal(user.id.toString())
                        expect(comment.post.toString()).to.equal(post.id.toString())
                        expect(comment.text).to.equal("commentTest")
                    })

            )

    })

    it("fails on non-existing user", () => {
        let errorThrown
        return Post.create({
            author: new ObjectId(),
            image: "http://test.com",
            workout: new ObjectId(),
            result: new ObjectId(),
            description: "descriptionTest",
            likes: []
        })
            .then(post => createComment(new ObjectId().toString(), post.id, "commentTest"))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
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
            .then(user => createComment(user.id, new ObjectId().toString(), "commentTest"))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(NotFoundError)
                expect(errorThrown.message).to.equal("post not found")
            })
    })

    it("fails on invalid userId", () => {
        let errorThrown

        try {
            createComment(1234, new ObjectId().toString(), "commentTest")
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
            createComment(new ObjectId().toString(), 12345, "commentTest")

        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("postId is not valid")
        }
    })

    it("fails on invalid text", () => {
        let errorThrown

        try {
            createComment(new ObjectId().toString(), new ObjectId().toString(), 1234)

        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("text is not valid")
        }
    })

    after(() => Promise.all([User.deleteMany(), Post.deleteMany(), Comment.deleteMany()]).then(() => mongoose.disconnect()))





})
