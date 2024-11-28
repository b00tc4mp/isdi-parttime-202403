import deletePost from './deletePost.js'

import { User, Post } from '../data/index.js'

import 'dotenv/config'

import * as mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { MatchError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('deletePost', () => {
  before(() =>
    mongoose
      .connect(MONGODB_URL_TEST)
      .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
  )

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it('succeeds on delete Post', () =>
    bcrypt
      .hash('123123123', 8)
      .then((hash) =>
        User.create({
          name: 'Mac',
          surname: 'Book',
          email: 'mac@book.com',
          username: 'macbook',
          password: hash,
        })
      )
      .then((user) => {
        return Post.create({
          author: user.id,
          title: 'Hello Title',
          image:
            'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
          description: 'hello description',
          likes: [],
        })
          .then((post) => ({ user, post }))

          .then(({ user, post }) => {
            deletePost(user.id, post.id)
          })
          .then((postId) =>
            Post.findById(postId).then((deletedPost) => {
              expect(deletedPost).to.be.null
            })
          )
      }))

  it('fails on non-existing user', () => {
    let errorThrown

    return Post.create({
      author: new ObjectId().toString(),
      title: 'Hello Title',
      image:
        'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
      description: 'hello description',
      likes: [],
    })
      .then((post) => {
        return deletePost(new ObjectId().toString(), post.id)
      })
      .catch((error) => (errorThrown = error))
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })

  it('fails on non-existing post', () => {
    let errorThrown

    return bcrypt
      .hash('123123123', 8)
      .then((hash) => {
        return User.create({
          name: 'Mac',
          surname: 'Book',
          email: 'mac@book.com',
          username: 'macbook',
          password: hash,
        })
      })
      .then((user) => {
        return deletePost(user.id, new ObjectId().toString())
      })
      .catch((error) => (errorThrown = error))
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('post not found')
      })
  })

  it('fails on non-match user', () => {
    let errorThrown

    return Post.create({
      author: new ObjectId().toString(),
      title: 'Hello Title',
      image:
        'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
      description: 'hello description',
      likes: [],
    })
      .then((post) =>
        bcrypt
          .hash('123123123', 8)
          .then((hash) =>
            User.create({
              name: 'Mac',
              surname: 'Book',
              email: 'mac@book.com',
              username: 'macbook',
              password: hash,
            })
          )
          .then((user) => deletePost(user.id, post.id))
      )
      .catch((error) => (errorThrown = error))
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(MatchError)
        expect(errorThrown.message).to.equal('post author does not match user')
      })
  })

  after(() =>
    Promise.all([User.deleteMany(), Post.deleteMany()]).then(() =>
      mongoose.disconnect()
    )
  )
})
