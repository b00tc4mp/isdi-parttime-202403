import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"
import { expect } from "chai"
import { Post, User } from "../data/index.js"

import createPostComments from "./createPostComments.js"
import { NotFoundError, ContentError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe("createPostComments", () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
    return Promise.all([User.deleteMany(), Post.deleteMany()])
  }))

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it("succeeds on new comment", () => {
    return bcrypt.hash("1234", 8)
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
          title: "Hello world",
          image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
          description: "hello description",
          liked: [],
          comments: []
        })

        return Promise.all([user.save(), post.save()])
          .then(([user, post]) => createPostComments(user.id, post.id, "Test comment, i like testing ♥")
            .then(() => Post.findById(post.id))
            .then(post => {
              expect(post.comments[0].author.toString()).to.equal(user.id.toString())
              expect(post.comments[0].text).to.equal("Test comment, i like testing ♥")
            })
          )
      })
  })

  it("fails on non-existing user", () => {
    let errorThrown

    return Post.create({
      author: new ObjectId(),
      title: "Hello world",
      image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
      description: "hello description",
      liked: [],
      comments: []
    })
      .then((post) => createPostComments(new ObjectId().toString(), post.id, "Test comment, i like testing ♥"))
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
      .then((user) => createPostComments(user.id, new ObjectId().toString(), "Test comment, i like testing ♥"))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal("❌ Post not found ❌")
      })
  })


  it("fails on invalid userId", () => {
    let errorThrown

    try {
      createPostComments(7777, new ObjectId().toString(), "Test comment, i like testing ♥")
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
      createPostComments(new ObjectId().toString(), 777, "Test comment, i like testing ♥")
    } catch (error) {
      errorThrown = error

    } finally {
      expect(errorThrown).to.be.an.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("❌ postId is not valid ❌")
    }
  })

  it("fails on invalid comment", () => {
    let errorThrown

    try {
      createPostComments(new ObjectId().toString(), new ObjectId().toString(), 7777)
    } catch (error) {
      errorThrown = error

    } finally {
      expect(errorThrown).to.be.an.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("❌ textComment is not valid ❌")
    }
  })

  after(() => Post.deleteMany().then(() => User.deleteMany()).then(() => mongoose.disconnect()))
})