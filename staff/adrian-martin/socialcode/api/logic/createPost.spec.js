import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Post, User } from '../data/index.js'

import createPost from './createPost.js'

import { ContentError } from 'com/error.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('createPost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([Post.deleteMany(), User.deleteMany()])))

    beforeEach(() => Promise.all([Post.deleteMany(), User.deleteMany()]))

    it('succeeds on existing user', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash }))
            .then(user =>
                createPost(user.id, 'Hola', 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif', 'funcionará el test?')
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post.author.toString()).to.equal(user.id)
                        expect(post.title).to.equal('Hola')
                        expect(post.image).to.equal('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif')
                        expect(post.description).to.equal('funcionará el test?')
                    })
            )
    )

    //TODO unhappies

    after(() => Promise.all([Post.deleteMany(), User.deleteMany()]).then(() => mongoose.disconnect()))
})