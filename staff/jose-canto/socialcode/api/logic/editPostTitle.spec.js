import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"
import { expect } from "chai"
import { Post, User } from "../data/index.js"


import { NotFoundError, ContentError } from "com/errors.js"
import editPostTitle from "./editPostTitle.js"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe("editPostTItle", () => {
  before(() => mongoose.connect(MONGODB_URL_TEST)
    .then(() => {
      return Promise.all([User.deleteMany(), Post.deleteMany()])
    }))
  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it("succeeds on edit post", () =>

    bcrypt.hash("1234", 8)
      .then((hash) => {

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
          comments: [],
        })

        return Promise.all([user.save(), post.save()])
      })
      .then(([user, post]) => editPostTitle(user.id.toString(), post.id.toString(), "Hola estoy editando el titulo"))
      .then(() => Post.findOne())
      .then((postId) => {
        expect(postId).to.be.an("object")
        expect(postId.title).to.be.equal("Hola estoy editando el titulo")
        expect(postId.title).to.be.an("string")
      })
  )

  it("fails on non-existing user", () => {
    let errorThrown

    return Post.create({
      author: new ObjectId().toString(),
      title: "Hello Title",
      image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
      description: "hello description",
      liked: [],
      comments: [],
    })
      .then((post) => editPostTitle(new ObjectId().toString(), post.id, "Hello editing title"))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.be.equal("❌ User not found ❌")
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
      })
        .then((user) => editPostTitle(user.id, new ObjectId().toString(), "Hello editing title"))
        .catch(error => errorThrown = error)
        .finally(() => {
          expect(errorThrown).to.be.an.instanceOf(NotFoundError)
          expect(errorThrown.message).to.be.equal("❌ Post not found ❌")
        })
      )
  })

  it("fails on invalid userId", () => {
    let errorThrown

    try {
      editPostTitle(12345, new ObjectId().toString(), "Hello editing title")
    } catch (error) {
      errorThrown = error

    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("❌ userId is not valid ❌")
    }
  })

  it("fails on invalid userId", () => {
    let errorThrown

    try {
      editPostTitle(new ObjectId().toString(), 12345, "Hello editing title")
    } catch (error) {
      errorThrown = error

    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("❌ postId is not valid ❌")
    }
  })

  after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
})