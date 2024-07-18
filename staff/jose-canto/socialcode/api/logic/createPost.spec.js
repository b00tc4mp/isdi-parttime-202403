import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"
import { expect } from "chai"
import { Post, User } from "../data/index.js"

import createPost from "./createPost.js"
import { NotFoundError, ContentError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe("createPost", () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
    return Promise.all([User.deleteMany(), Post.deleteMany()])
  }))

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it("succeeds on new post", () =>
    bcrypt.hash("1234", 8)
      .then(hash => User.create({
        name: "Mocha",
        surname: "Chai",
        email: "Mocha@Chai.com",
        username: "MochaChai",
        password: hash
      }))
      .then(user =>
        createPost(user.id, "Hello Title", "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", "hello description", [])
          .then(() => user)
      )
      .then(user =>
        Post.findOne().then(post => {
          expect(post.author.toString()).to.equal(user.id.toString())
          expect(post.title).to.equal("Hello Title")
          expect(post.image).to.equal("https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g")
          expect(post.description).to.equal("hello description")
        })
      )
  )

  it("fails on non-exsiting user", () => {
    let errorThrown

    return createPost(new ObjectId().toString(), "Hello title", "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", "hello description", [])
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal("❌ User not found ❌")
      })
  })

  it("fails on invalid userId", () => {
    let errorThrown
    try {
      createPost(1234, "Hello title", "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", "hello description", [])
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("❌ userId is not valid ❌")
    }
  })

  it("fails on invalid title", () => {
    let errorThrown
    try {
      createPost(new ObjectId().toString(), 1234, "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", "hello description", [])
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("❌ title is not valid ❌")
    }
  })

  it("fails on invalid image", () => {
    let errorThrown
    try {
      createPost(new ObjectId().toString(), "Hello Title", 7777, "hello description", [])
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("❌ image is not valid ❌")
    }
  })

  it("fails on invalid description", () => {
    let errorThrown
    try {
      createPost(new ObjectId().toString(), "Hello Title", "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 7777, [])
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("❌ description is not valid ❌")
    }
  })


  after(() => Post.deleteMany().then(() => User.deleteMany().then(() => mongoose.disconnect())))
})
