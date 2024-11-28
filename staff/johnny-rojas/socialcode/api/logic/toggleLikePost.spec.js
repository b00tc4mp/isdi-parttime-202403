import 'dotenv'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'
import { User, Post } from '../data/index.js'

import toggleLikePost from './toggleLikePost.js'
import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('toggleLikePost', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
  )

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it('succeeds on toggle like post', () => {

    return bcrypt.hash('762576', 8)
      .then(hash => {
        const user = new User({
          name: 'Chai',
          surname: 'Mocha',
          email: 'Chai@Mocha.com',
          username: 'Chaimocha',
          password: hash
        })
        const post = new Post({
          author: user.id,
          title: 'Waiting',
          image: 'https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif?cid=790b7611yb20jdosl86ihw77i89it7b5uur5ioosyxdzv1y4&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
          description: 'tictoctictoc',
          date: new Date,
          likes: [],
          comments: []
        })
        return Promise.all([user.save(), post.save()])
      })
      .then(([user, post]) =>
        toggleLikePost(user.id, post.id)
          .then(() => Post.findById(post.id))
          .then((post) => {
            expect(post.likes.map(userObjectId => userObjectId.toString())).to.contain(user.id)
          })
      )
  })

  it('succeeds on verify if user and post have likes', () => {

    return bcrypt.hash('762576', 8)
      .then(hash => {
        const user = new User({
          name: 'Chai',
          surname: 'Mocha',
          email: 'Chai@Mocha.com',
          username: 'Chaimocha',
          password: hash
        })
        const post = new Post({
          author: user.id,
          title: 'Waiting',
          image: 'https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif?cid=790b7611yb20jdosl86ihw77i89it7b5uur5ioosyxdzv1y4&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
          description: 'tictoctictoc',
          date: new Date,
          likes: [user.id],
          comments: []
        })
        return Promise.all([user.save(), post.save()])
      })
      .then(([user, post]) =>
        toggleLikePost(user.id, post.id)
          .then(() => Post.findById(post.id))
          .then((post) => {
            expect(post.likes).to.be.empty
          })
      )
  })

  it('fails on non-existing user', () => {
    let errorThrown

    return Post.create({
      author: new ObjectId(),
      title: 'Waiting',
      image: 'https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif?cid=790b7611yb20jdosl86ihw77i89it7b5uur5ioosyxdzv1y4&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
      description: 'tictoctictoc',
      date: new Date,
      likes: [],
      comments: []
    })
      .then((post) => toggleLikePost(new ObjectId().toString(), post.id))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })

  it('fails on non-existing post', () => {
    let errorThrown

    return bcrypt.hash('87268', 8)
      .then((hash) => User.create({
        name: 'Chai',
        surname: 'Mocha',
        email: 'Chai@Mocha.com',
        username: 'Chaimocha',
        password: hash
      }))
      .then((user) => toggleLikePost(user.id, new ObjectId().toString()))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('post not found')
      })
  })

  it('fails on invalid userId', () => {
    let errorThrown

    try {
      toggleLikePost(5345334, new ObjectId().toString())
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
    }
  })

  it('fails on ivalid postId', () => {
    let errorThrown

    try {
      toggleLikePost(new ObjectId().toString(), 972367)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.an.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('postId is not valid')
    }
  })

  after(() => Post.deleteMany().then(() => User.deleteMany().then(() => mongoose.disconnect())))
})