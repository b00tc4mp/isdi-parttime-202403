import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"

import { expect } from "chai"

import getPostComments from "./getPostComments.js"
import { Post, User } from "../data/index.js"
import { ContentError, NotFoundError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe("getPostComments", () => {

  before(() => mongoose.connect(MONGODB_URL_TEST)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
  )

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it("succeeds on new comment", () =>

    bcrypt.hash("1234", 8)
      .then(hash => {

        const user = new User({
          name: "Mocha",
          surname: "Chai",
          email: "Mocha@Chai.com",
          username: "MochaChai",
          password: hash
        })
        const post = new Post({
          author: user.id,
          title: "Hello Title",
          image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
          description: "hello description",
          liked: [],
          comments: [{
            author: user.id,
            text: "Hello comment! 👋🏼",
            date: new Date(),
          }]
        })
        return Promise.all([user.save(), post.save()])
          .then(([user, post]) => getPostComments(user.id.toString(), post.id.toString()))
          .then(comments => {
            expect(comments).to.be.an("array")
            expect(comments).to.have.lengthOf(1)
            expect(comments[0].text).to.equal("Hello comment! 👋🏼")
          })
      })
  )

  it("fails on non-existing user", () => {
    let errorThrown

    return Post.create({
      author: new ObjectId(),
      title: "Hello Title",
      image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
      description: "hello description",
      liked: [],
      comments: [{
        author: new ObjectId(),
        text: "Hello comment! 👋🏼",
        date: new Date(),
      }]
    })
      .then(() => Post.findOne())
      .then((post) => getPostComments(new ObjectId().toString(), post.id))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal("❌ User not found ❌")
      })
  })

  it("fails on non-existing post", () => {
    let errorThrown

    return bcrypt.hash("1234", 8)
      .then((hash) => User.create({
        name: "Mocha",
        surname: "Chai",
        email: "Mocha@Chai.com",
        username: "MochaChai",
        password: hash
      }))
      .then(() => User.findOne())
      .then((user) => getPostComments(user.id, new ObjectId().toString()))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal("❌ Post not found ❌")
      })
  })

  it("fails on invalid userId", () => {
    let errorThrown

    try {
      getPostComments(1234, new ObjectId().toString())

    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.an.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("❌ userId is not valid ❌")
    }
  })

  it("fails on invalid postId", () => {
    let errorThrown

    try {
      getPostComments(new ObjectId().toString(), 1234)

    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.an.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("❌ postId is not valid ❌")
    }
  })

  after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
})



