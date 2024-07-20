import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"

import getAllPosts from "./getAllPosts.js"
import { Post, User } from "../data/index.js"
import { expect } from "chai"
import { ContentError, NotFoundError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe("getAllPosts", () => {
  before(() => mongoose.connect(MONGODB_URL_TEST)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
  )

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it("succeeds on get all posts", () => {

    return bcrypt.hash("1234", 8)
      .then((hash) => User.create({
        name: "Mocha",
        surname: "Chai",
        email: "Mocha@Chai.com",
        username: "MochaChai",
        password: hash
      }))
      .then((user) => Post.create({
        author: user.id,
        title: "Hello Title",
        image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
        description: "hello description",
        liked: []
      })
        .then(() => user)
      )
      .then(user => getAllPosts(user.id, 1, 2))
      .then(posts => {
        expect(posts).to.be.an("array")
        expect(posts).to.have.lengthOf(1)
      })
  })

  it("fails on non-existing user", () => {
    let errorThrown

    return getAllPosts(new ObjectId().toString(), 1, 2)
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).equal("❌ User not found ❌")
      })
  })

  it("fails on invalid userId", () => {
    let errorThrown

    try {
      getAllPosts(77777, 1, 2)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.an.instanceOf(ContentError)
      expect(errorThrown.message).equal("❌ userId is not valid ❌")
    }
  })



  after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
})