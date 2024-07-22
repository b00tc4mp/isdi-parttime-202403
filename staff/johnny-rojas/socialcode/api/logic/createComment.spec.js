import 'dotenv'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { User, Post } from '../data/index.js'
import createComment from '../logic/createComment.js'

import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

debugger

describe('createComment', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
    return Promise.all([User.deleteMany(), Post.deleteMany()])
  }))

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it('succeeds on new post', () => {
    return bcrypt.hash('86873', 8)
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
          title: 'jeepeta',
          image: 'https://media.giphy.com/media/KEh5kliRTSVJm/giphy.gif?cid=82a1493b9ouww5te0ehma0gz6ttcyxrxwbzxdhw5m99taqh1&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
          description: 'Test driving',
          date: new Date,
          likes: [],
          comments: []
        })

        return Promise.all([user.save(), post.save()])
          .then(([user, post]) => createComment(user.id, post.id, 'F&F')
            .then(() => Post.findById(post.id))
            .then(post => {
              expect(post.comments[0].author.toString()).to.equal(user.id.toString())
              expect(post.comments[0].comment).to.equal('F&F')
            })
          )
      })
  })

  it('fails on non-existing user', () => {
    let errorThrown

    return Post.create({
      author: new ObjectId(),
      title: 'jeepeta',
      image: 'https://media.giphy.com/media/KEh5kliRTSVJm/giphy.gif?cid=82a1493b9ouww5te0ehma0gz6ttcyxrxwbzxdhw5m99taqh1&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
      description: 'Test driving',
      date: new Date,
      likes: [],
      comments: []
    })
      .then((post) => createComment(new ObjectId().toString(), post.id, 'F&F'))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
    })
  })

  it('fails on non-existing post', () => {
    let errorThrown

    return bcrypt.hash('4321', 8)
      .then((hash) => User.create({
        name: 'Chai',
        surname: 'Mocha',
        email: 'Chai@Mocha.com',
        username: 'Chaimocha',
        password: hash
      }))
      .then((user) => createComment(user.id, new ObjectId().toString(), 'F&F'))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('post not found')
    })
  })

  it('fails on ivalid userId', () => {
    let errorThrown

    try {
      createComment(96737, new ObjectId().toString(), 'F&F')
      
    } catch (error) {
      errorThrown = error
      
    } finally {
      expect(errorThrown).to.be.an.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
      
    }
  })

  it('fails on ivalid postId', () => {
    let errorThrown

    try {
      createComment(new ObjectId().toString(), 972367, 'F&F')
      
    } catch (error) {
      errorThrown = error

    } finally {
      expect(errorThrown).to.be.an.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('postId is not valid')
    }
  })

  it('fails on ivalid comment', () => {
    let errorThrown

    try {
      createComment(new ObjectId().toString(), new ObjectId().toString(), 8976327)
      
    } catch (error) {
      errorThrown = error
      
    } finally {
      expect(errorThrown).to.be.an.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('comment is not valid')
      
    }
  })

  after(() => Post.deleteMany().then(()=> User.deleteMany().then(() => mongoose.disconnect())))
})