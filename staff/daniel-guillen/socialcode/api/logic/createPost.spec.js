import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Post, User } from '../data/index.js'

import createPost from './createPost.js'

import { ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('createPost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user', () =>
        bcrypt.hash('123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Pollo', email: 'mac@pollo.com', username: 'MacPollo', password: hash }))
            .then(user =>
                createPost(user.id, 'Hola', 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2J5NGJpbmZjOGRwdTUzdTEzem42aXEwaGxsMWluMTQ0NGZhcjVlNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Pbou33imqjnTa/200.webp', 'funcionará el test?')
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post.author.toString()).to.equal(user.id)
                        expect(post.title).to.equal('Hola')
                        expect(post.image).to.equal('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2J5NGJpbmZjOGRwdTUzdTEzem42aXEwaGxsMWluMTQ0NGZhcjVlNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Pbou33imqjnTa/200.webp')
                        expect(post.description).to.equal('funcionará el test?')
                    })
            )
    )

    // TODO unhappies

    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
})