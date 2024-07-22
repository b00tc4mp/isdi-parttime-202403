import 'dotenv'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Post, User } from '../data/index.js'

import createPost from './createPost.js'

import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

debugger

describe('createPost', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany()])))

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it('succeeds on new post', () =>
    bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Chai',
        surname: 'Mocha',
        email: 'Chai@Mocha.com',
        username: 'Chaimocha',
        password: hash
      }))

      .then(user =>
        createPost(user.id, 'SaxoGuy', 'https://media.giphy.com/media/7vAwVEdJS5cKxediyK/giphy.gif?cid=82a1493bp3k0u2y3xvspwzh4uvd8j21fsl4ursis3uruy526&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'PlaySomeMusic', [], [])
          .then(() => Post.findOne())
          .then(post => {
            expect(post.author.toString()).to.equal(user.id)
            expect(post.title).to.equal('SaxoGuy')
            expect(post.image).to.equal('https://media.giphy.com/media/7vAwVEdJS5cKxediyK/giphy.gif?cid=82a1493bp3k0u2y3xvspwzh4uvd8j21fsl4ursis3uruy526&ep=v1_gifs_trending&rid=giphy.gif&ct=g')
            expect(post.description).to.equal('PlaySomeMusic')
            expect(post.likes).to.be.an('array')
            expect(post.likes).to.be.an('array')
          })
      )
  )

  it('fails on non-existing user', () => {
    let errorThrown

    return createPost(new ObjectId().toString(), 'SaxoGuy', 'https://media.giphy.com/media/7vAwVEdJS5cKxediyK/giphy.gif?cid=82a1493bp3k0u2y3xvspwzh4uvd8j21fsl4ursis3uruy526&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'PlaySomeMusic', [], [])
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })

  it('fails on invalid userId', () => {
    let errorThrown

    try {
      createPost(1111, 'SaxoGuy', 'https://media.giphy.com/media/7vAwVEdJS5cKxediyK/giphy.gif?cid=82a1493bp3k0u2y3xvspwzh4uvd8j21fsl4ursis3uruy526&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'PlaySomeMusic', [], [])
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
    }
  })

  it('fails on invalid title', () => {
    let errorThrown

    try {
      createPost(new ObjectId().toString(), 1234, 'https://media.giphy.com/media/7vAwVEdJS5cKxediyK/giphy.gif?cid=82a1493bp3k0u2y3xvspwzh4uvd8j21fsl4ursis3uruy526&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'PlaySomeMusic', [], [])
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('title is not valid')
    }
  })

  it('fails on invalid image', () => {
    let errorThrown

    try {
      createPost(new ObjectId().toString(), 'SaxoGuy', 1234, 'PlaySomeMusic', [], [])
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('image is not valid')
    }
  })

  it('fails on invalid description', () => {
    let errorThrown

    try {
      createPost(new ObjectId().toString(), 'SaxoGuy', 'https://media.giphy.com/media/7vAwVEdJS5cKxediyK/giphy.gif?cid=82a1493bp3k0u2y3xvspwzh4uvd8j21fsl4ursis3uruy526&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 981687, [], [])
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('description is not valid')
    }
  })

  after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
})