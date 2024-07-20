import createPost from './createPost.js'

import { User, Post } from '../data/index.js'

import 'dotenv/config'

import * as mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { ContentError, CredentialsError } from 'com/errors.js'
import authenticateUser from './authenticateUser.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('createPost', () => {
  before(() =>
    mongoose
      .connect(MONGODB_URL_TEST)
      .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
  )

  beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

  it('succeeds on existing user', () =>
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
      .then((user) =>
        createPost(
          user.id,
          'Hola',
          'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif',
          'funcionará el test?'
        )
          .then(() => Post.findOne())
          .then((post) => {
            expect(post.author.toString()).to.equal(user.id)
            expect(post.title).to.equal('Hola')
            expect(post.image).to.equal(
              'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif'
            )
            expect(post.description).to.equal('funcionará el test?')
          })
      ))

  it('fails on non-existing user', () => {
    let errorThrown

    return createPost(new ObjectId(), 'Hola', 'https://', 'funcionará el test?')
      .catch((error) => {
        errorThrown = error
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(CredentialsError)
        expect(errorThrown.message).to.equal('user not found')
      })
  })

  after(() =>
    Promise.all([User.deleteMany(), Post.deleteMany()]).then(() =>
      mongoose.disconnect()
    )
  )
})
