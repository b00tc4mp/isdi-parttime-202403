import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

import { expect } from "chai"

import { User, Post } from "../data/index.js"

import toggleLikePost from "./toggleLikePost.js"

const { MONGODB_URL_TEST } = process.env


describe("toggleLikePost", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it("succeeds on existing user and post with no likes", () =>
        bcrypt.hash("12345678", 8)
            .then(hash => {
                const user = new User({ name: "Mocha", surname: "Chai", email: "Mocha@Chai.com", username: "MochaChai", password: hash })

                const post = new Post({ author: user.id, title: "Hello world", image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", description: "hello description" })

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
        bcrypt.hash("12345678", 8)
            .then(hash => {
                const user = new User({ name: "Mocha", surname: "Chai", email: "Mocha@Chai.com", username: "MochaChai", password: hash })

                const post = new Post({ author: user.id, title: "Hello world", image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", description: "hello description", likes: [user.id] })

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




    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})