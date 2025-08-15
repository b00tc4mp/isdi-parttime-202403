import "dotenv/config"
import { User, Post } from "../data/index.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import { Types } from "mongoose"

import { ContentError, NotFoundError } from "com/errors.js"
import { expect } from "chai"
import toggleLikePost from "./toggleLikePost.js"

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe("toggleLikePost", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
    beforeEach(() => User.deleteMany())

    it("succeeds on existing user and post with no likes", () =>
        bcrypt.hash("1234", 8)
            .then(hash => {
                const user = new User({ email: "Mocha@Chai.com", username: "MochaChai", password: hash })
                const post = new Post({ author: user.id, title: "Mochi", image: "https://", description: "hello description" })
                return Promise.all([user.save(), post.save()])
            })
            .then(([user, post]) =>
                toggleLikePost(user.id, post.id)
                    .then(() => Post.findById(post.id))
                    .then((post) => {
                        expect(post.likes.map(userObjectId => userObjectId.toString())).to.contain(user.id)
                    })
            )
    )

    it("succeeds on existing user and post with likes", () =>
        bcrypt.hash("1234", 8)
            .then(hash => {
                const user = new User({ email: "Mocha@Chai.com", username: "MochaChai", password: hash })
                const post = new Post({ author: user.id, title: "Mochi", image: "https://", description: "hello description", likes: [user.id] })
                return Promise.all([user.save(), post.save()])
            })
            .then(([user, post]) =>
                toggleLikePost(user.id, post.id)
                    .then(() => Post.findById(post.id))
                    .then((post) => {
                        expect(post.likes).to.be.empty
                    })
            )
    )

    it("fails on non existing user", () => {
        let errorThrown

        return Post.create({ author: new ObjectId(), title: "Mochi", image: "https://", description: "hello description", likes: [] })
            .then(post => toggleLikePost(new ObjectId().toString(), post.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })

    })

    it("fails on non-existing post", () => {
        let errorThrown
        //metemos el then dentro del otro then para poder usar el user.id y qu este dentro del scoope
        return bcrypt.hash("1234", 8)
            .then(hash => User.create({ email: "Mocha@Chai.com", username: "MochaChai", password: hash })
                .then(user => toggleLikePost(user.id, new ObjectId().toString()))
            )
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("post not found")
            })

    })

    it("fails on invalid userID", () => {
        let errorThrown

        try {
            toggleLikePost(12345, new ObjectId().toString())

        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }
    })

    it("fails on invalid postID", () => {
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

    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})
