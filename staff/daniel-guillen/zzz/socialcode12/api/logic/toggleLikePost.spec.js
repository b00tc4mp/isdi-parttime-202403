import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"

import { expect } from "chai"

import { User, Post } from "../data/index.js"

import toggleLikePost from "./toggleLikePost.js"

import { NotFoundError, ContentError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe("toggleLikePost", () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it("succeeds on existing user and post with no likes", () =>

    bcrypt.hash("123", 8)
      .then(hash => {
        const user = new User({ name: "Mac", surname: "Pollo", email: "mac@pollo.com", username: "MacPollo", password: hash })

        const post = new Post({ author: user.id, title: "Hello Chicken", image: "https://media3.giphy.com/media/Eha0thdXTeX2U/giphy.webp?cid=790b7611sew7yoy6wkr8omnrlkk1f9vljolaljfe4jq0mo6w&ep=v1_gifs_search&rid=giphy.webp&ct=g", description: "hello pollo" })

        return Promise.all([user.save(), post.save()])
      })
      .then(([user, post]) =>
        toggleLikePost(user.id, post.id)
          .then(() => Post.findById(post.id))
          .then((post) => {
            expect(post.liked.map(userObjectId => userObjectId.toString())).to.contain(user.id)
          })
      )
  )

  it("succeeds on existing user and post with likes", () =>

    bcrypt.hash("123", 8)
      .then(hash => {
        const user = new User({ name: "Mac", surname: "Pollo", email: "mac@pollo.com", username: "MacPollo", password: hash })

        const post = new Post({ author: user.id, title: "Hello Chicken", image: "https://media3.giphy.com/media/Eha0thdXTeX2U/giphy.webp?cid=790b7611sew7yoy6wkr8omnrlkk1f9vljolaljfe4jq0mo6w&ep=v1_gifs_search&rid=giphy.webp&ct=g", description: "hello pollo" })

        return Promise.all([user.save(), post.save()])
      })
      .then(([user, post]) =>
        toggleLikePost(user.id, post.id)
          .then(() => Post.findById(post.id))
          .then((post) => {
            expect(post.liked).to.be.empty
          })
      )
  )

  it("fails on non-exsiting user", () => {
    let errorThrown

    return Post.create({ author: new ObjectId(), title: "Hello Chicken", image: "https://media3.giphy.com/media/Eha0thdXTeX2U/giphy.webp?cid=790b7611sew7yoy6wkr8omnrlkk1f9vljolaljfe4jq0mo6w&ep=v1_gifs_search&rid=giphy.webp&ct=g", description: "hello pollo", liked: [] })
      .then((post) => toggleLikePost(new ObjectId().toString(), post.id))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal("user not found ❌")
      })
  })

  it("fails on non-existing post", () => {
    let errorThrown

    return bcrypt.hash("1234", 8)
      .then((hash) => User.create({
        name: "Mac",
        surname: "Pollo",
        email: "mac@pollo.com",
        username: "MacPollo",
        password: hash
      })
        .then((user) => toggleLikePost(user.id, new ObjectId().toString())))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal("post not found ❌")
      })
  })

  it("fails on invalid userId", () => {
    let errorThrown

    try {
      toggleLikePost(123, new ObjectId().toString())
    } catch (error) {
      errorThrown = error

    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("userId is not valid ❌")
    }
  })

  it("fails on invalid postId", () => {
    let errorThrown

    try {
      toggleLikePost(new ObjectId().toString(), 123)
    } catch (error) {
      errorThrown = error

    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("postId is not valid ❌")
    }
  })

  after(() => Post.deleteMany().then(() => User.deleteMany().then(() => mongoose.disconnect())))
})