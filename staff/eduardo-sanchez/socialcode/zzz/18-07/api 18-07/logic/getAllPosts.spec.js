import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"

import getAllPosts from "./getAllPosts.js"
import { Post, User } from "../data/index.js"
import { expect } from "chai"
import { ContentError, NotFoundError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

debugger


describe("getAllPosts", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('suceeds on getting all posts', () => {
        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: "Amigo", surname: "Mio", email: "amigo@mio.com", username: "amigomio", password: hash }))
            .then(user =>
                Post.create({ author: user.id, title: 'Hola', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif', description: 'funcionará el test?', date: new Date(), likes: [] })
                    .then(() => user))
            .then(user => getAllPosts(user.id))
            .then(posts => {
                expect(posts).to.be.an("array")
                expect(posts).to.have.lengthOf(1)
            })
    })

    it("fails on non-existing user", () => {
        let errorThrown

        return getAllPosts(new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })
    })

    it("fails on invalid userId", () => {
        let errorThrown

        try {
            getAllPosts(77777)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})

