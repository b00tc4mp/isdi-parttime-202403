import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"
import { expect } from "chai"
import { User, Post } from "../data/index.js"
import toggleLikePost from "./toggleLikePost.js"
import { NotFoundError, ContentError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe("toggleLikePost", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()).then(() => Post.deleteMany()))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    it("suceeds on existing post without likes", () =>
        bcrypt.hash("1234", 8)
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
                    workout: new ObjectId().toString(),
                    result: new ObjectId().toString(),
                    image: "http://test.com",
                    description: "descriptionTest",
                    time: 10,
                    likes: [],
    
                })
                return Promise.all([user.save(), post.save()])

            })
            .then(([user, post]) => toggleLikePost(user.id, post.id)
                .then(() => Post.findById(post.id))
                .then(post => {
                    expect(post.likes.map(userObjectId => userObjectId.toString())).to.contain(user.id)

                })
            )
    )

    it("succeeds on existing user and post with likes", () =>
        bcrypt.hash("1234", 8)
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
                    workout: new ObjectId().toString(),
                    result: new ObjectId().toString(),
                    image: "http://test.com",
                    description: "descriptionTest",
                    time: 10,
                    likes: [user.id],
    
                })
                return Promise.all([user.save(), post.save()])
            })
            .then(([user, post]) => toggleLikePost(user.id, post.id)
                .then(() => Post.findById(post.id))
                .then(post => {
                    expect(post.likes).to.be.empty
                })
            )
    )
    it("fails on non-existing user", () => {
        let errorThrown

        return Post.create({
            author: new ObjectId(),
            workout: new ObjectId(),
            result: new ObjectId(),
            image: "http://test.com",
            description: "descriptionTest",
            time: 10,
            likes: [],
        })
            .then(post => toggleLikePost(new ObjectId().toString(), post.id))
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
            .then(user => toggleLikePost(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(NotFoundError)
                expect(errorThrown.message).to.equal("post not found")
            })
    })

    it("fails on invalid userId", () => {
        let errorThrown

        try {
            toggleLikePost(1234, new ObjectId().toString())
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
            toggleLikePost(new ObjectId().toString(), 12345)

        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("postId is not valid")
        }
    })


    after(() => Post.deleteMany().then(() => User.deleteMany().then(() => mongoose.disconnect())))

})