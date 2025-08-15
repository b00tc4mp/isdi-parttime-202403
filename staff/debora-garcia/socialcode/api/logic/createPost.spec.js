import "dotenv/config"
import { User, Post } from "../data/index.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import { expect } from "chai"

import { CredentialsError, ContentError, NotFoundError } from "com/errors.js"
import createPost from "./createPost.js"
import { ObjectId } from "mongodb"

const { MONGODB_URL_TEST } = process.env

describe("createPost", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Post.deleteMany()])
    }))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it("suceeds on new post", () =>
        bcrypt.hash("1234", 8)
            .then(hash => User.create({ username: "meloinvento", email: "meinvento@gmail.com", password: hash }))
            .then(user => createPost(user.id, "Hello Post", "https", "description", [])
                .then(() => user)
            )
            .then(user =>
                Post.findOne().then(post => {
                    expect(post.author.toString()).to.equal(user.id.toString())
                    expect(post.title).to.equal("Hello Post")
                    expect(post.image).to.equal("https")
                    expect(post.description).to.equal("description")
                    expect(post.likes).to.be.an("array")
                    //expect(post.comments).to.be.an("array")
                })
            )
    )

    it("fails on non-existing user", () => {
        let errorThrown

        return createPost(new ObjectId().toString(), "Hello Post", "https://whatever", "description", [])
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })
    })

    it("fails on invalid userId", () => {
        let errorThrown

        try {
            createPost(1234, "Hello Post", "https://whatever", "description", [])
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }
    })

    it("fails on invalid title", () => {
        let errorThrown

        try {
            createPost(new ObjectId().toString(), 1234, "https://whatever", "description", [])
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("title is not valid")
        }
    })

    it("fails on invalid image", () => {
        let errorThrown

        try {
            createPost(new ObjectId().toString(), "Title", 1234, "description", [])
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("image is not valid")
        }
    })

    it("fails on invalid description", () => {
        let errorThrown

        try {
            createPost(new ObjectId().toString(), "Title", "https://whatever", 1234, [])
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("description is not valid")
        }
    })

    after(() => Post.deleteMany().then(() => User.deleteMany().then(() => mongoose.disconnect())))

})


