import 'dotenv'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import getAllPosts from './getAllPosts.js'
import { Post, User } from '../data/index.js'
import { expect } from 'chai'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('getAllPost', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
  )

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it('succeeds on get all posts', () => {

    return bcrypt.hash('762576', 8)
      .then((hash) => User.create({
        name: 'Chai',
        surname: 'Mocha',
        email: 'Chai@Mocha.com',
        username: 'Chaimocha',
        password: hash
      }))
      .then((user) => Post.create({
        author: user.id,
        title: 'Waiting',
        image: 'https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif?cid=790b7611yb20jdosl86ihw77i89it7b5uur5ioosyxdzv1y4&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
        description: 'tictoctictoc',
        date: new Date,
        likes: [],
        comments: []
      })
        .then(() => user)
    )
      .then(user => getAllPosts(user.id, 1, 2))
      .then(posts => {
        expect(posts).to.be.an('array')
        expect(posts).to.have.lengthOf(1)
    })
  })

  it('fails on non-existing user', () => {
    let errorThrown

    return getAllPosts(new ObjectId().toString(), 1, 2)
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })

  it('fails on invalid userId', () => {
    let errorThrown

    try {
      getAllPosts(5345334, 1, 2)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal('userId is not valid')
    }
  })


  after(() => Post.deleteMany().then(() => User.deleteMany().then(() => mongoose.disconnect())))
})
