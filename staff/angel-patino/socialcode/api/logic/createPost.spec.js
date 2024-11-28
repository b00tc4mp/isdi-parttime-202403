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
        bcrypt.hash('123123123', 8)
            .then((hash) => User.create({ name: 'mocha', surname: 'chai', email: 'mocha@chai.com', username: 'mochachai', password: hash }))
            .then(user =>
                createPost(user.id, 'Hola', 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmpyZ2k4bG1wcjlucTI0bDZkZm1iYTV6eDFlNGJ0MDNwajN0YW96YyZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/YjtShGLHqCkUQRFjRx/giphy.gif', 'funcionará?')
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post.author.toString()).to.equal(user.id)
                        expect(post.title).to.equal('Hola')
                        expect(post.image).to.equal('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmpyZ2k4bG1wcjlucTI0bDZkZm1iYTV6eDFlNGJ0MDNwajN0YW96YyZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/YjtShGLHqCkUQRFjRx/giphy.gif')
                        expect(post.description).to.equal('funciona el test?')
                    })
            )
    )

    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))

})