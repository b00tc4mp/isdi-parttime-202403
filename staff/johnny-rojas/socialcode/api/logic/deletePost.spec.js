import 'dotenv'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User, Post } from '../data/index.js'

import deletePost from './deletePost.js'

import { NotFoundError, MatchError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

debugger

describe('deletePost', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
    return Promise.all([User.deleteMany(), Post.deleteMany()])
  }))

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it('succeeds on delete post', () =>
    bcrypt.hash('1234', 8)
      .then(hash => User.create({
        name: 'Chai',
        surname: 'Mocha',
        email: 'Chai@Mocha.com',
        username: 'Chaimocha',
        password: hash
      }))
      .then(user =>
        Post.create({
          author: user.id,
          title: 'byebyebiden',
          image: 'https://media.giphy.com/media/LXLgiN2R8YMtdwalWu/giphy.gif?cid=790b76118ra5owldsh83bbp53mcp6fqy0arty6txq35bbhac&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
          description: 'DDD:',
          date: new Date,
          likes: [],
          comments: []
        })
          .then((post) => ({ user, post }))
      )
      .then(({ user, post }) =>
        deletePost(user.id, post.id)
      )
      .then(postId =>
        Post.findById(postId).then(deletePost => {
          expect(deletePost).to.be.null
        })

      )
  )

  it('fails on non-existing user', () => {
    let errorThrown

    return Post.create({
      author: new ObjectId().toString(),
      title: 'byebyebiden',
      image: 'https://media.giphy.com/media/LXLgiN2R8YMtdwalWu/giphy.gif?cid=790b76118ra5owldsh83bbp53mcp6fqy0arty6txq35bbhac&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
      description: 'DDD:',
      date: new Date,
      likes: [],
      comments: []
    })
      .then((post) => deletePost(new ObjectId().toString(), post.id))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })

  it('fails on non-existing post', () => {
    let errorThrown

    return bcrypt.hash('123456', 8)
      .then((hash) => User.create({
        name: 'Biden',
        surname: 'Joejoe',
        email: 'Joe@biden.com',
        username: 'Joe',
        password: hash
      })
        .then((user) => deletePost(user.id, new ObjectId().toString())))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('post not found')

      })
  })

  it('fails on non-match user', () => {
    let errorThrown

    return bcrypt.hash('1234', 8)
      .then(hash => {
        const user = new User({
          name: 'Chai',
          surname: 'Mocha',
          email: 'Chai@Mocha.com',
          username: 'Chaimocha',
          password: hash
        })
        const post = new Post({
          author: new ObjectId().toString(),
          title: 'byebyebiden',
          image: 'https://media.giphy.com/media/LXLgiN2R8YMtdwalWu/giphy.gif?cid=790b76118ra5owldsh83bbp53mcp6fqy0arty6txq35bbhac&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
          description: 'DDD:',
          date: new Date,
          likes: [],
          comments: []
        })
        return Promise.all([user.save(), post.save()])
          .then(([savedUser, savedPost]) => {
            return deletePost(savedUser.id.toString(), savedPost.id.toString())
          })
          .catch(error => errorThrown = error)
      })
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(MatchError)
        expect(errorThrown.message).to.equal('post author does not match user')
      })
  })

  it('fails on invalid userId', () => {
    let errorThrown

    try {
      deletePost(1111, new ObjectId().toString())
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
    }
  })

  it('fails on invalid postId', () => {
    let errorThrown

    try {
      deletePost(new ObjectId().toString(), 31432)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('postId is not valid')
    }
  })

  after(() => Post.deleteMany().then(() => User.deleteMany().then(() => mongoose.disconnect())))
})