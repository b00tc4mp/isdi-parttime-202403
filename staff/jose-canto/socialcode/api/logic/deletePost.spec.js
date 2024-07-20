import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"
import { expect } from "chai"
import { Post, User } from "../data/index.js"

import deletePost from "./deletePost.js"
import { ContentError, MatchError, NotFoundError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe("deletePost", () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
    return Promise.all([User.deleteMany(), Post.deleteMany()])
  }))
  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))


  it("succeeds on delete post", () =>
    bcrypt.hash("1234", 8)
      .then(hash => User.create({
        name: "Mocha",
        surname: "Chai",
        email: "Mocha@Chai.com",
        username: "MochaChai",
        password: hash
      }))
      .then(user =>
        Post.create({
          author: user.id,
          title: "Hello Title",
          image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
          description: "hello description",
          liked: [],
          comments: [],
        })
          .then((post) => ({ user, post }))
      )
      .then(({ user, post }) =>
        deletePost(user.id, post.id)
      )
      .then(postId =>
        Post.findById(postId).then(deletedPost => {
          expect(deletedPost).to.be.null
        })
      )
  )

  it("fails on non-existing user", () => {
    let errorThrown

    return Post.create({
      author: new ObjectId().toString(),
      title: "Hello Title",
      image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
      description: "hello description",
      liked: []
    })
      .then((post) => deletePost(new ObjectId().toString(), post.id)
      )
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
      })
        .then((user) => deletePost(user.id, new ObjectId().toString())))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal("❌ Post not found ❌")
      })
  })

  it("fails on non-match user", () => {
    let errorThrown

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
          author: new ObjectId().toString(),
          title: "Hello world",
          image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
          description: "hello description",
          liked: []
        })
        return Promise.all([user.save(), post.save()])
          .then(([savedUser, savedPost]) => {
            return deletePost(savedUser.id.toString(), savedPost.id.toString())
          })
          .catch(error => errorThrown = error)
      })
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(MatchError)
        expect(errorThrown.message).to.equal("❌ You can't delete this post ❌")
      })
  })


  after(() => Post.deleteMany().then(() => User.deleteMany().then(() => mongoose.disconnect())))
})

