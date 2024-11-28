import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User, Post } from '../data/models/index.js'

import toggleLikePost from './toggleLikePost.js'


const { MONGODB_URL_TEST } = process.env

debugger


describe('toggleLikePost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on exiting user and post with no likes', () =>

        bcrypt.hash('1234', 8)
            .then(hash => {
                const user = new User({ name: 'mocha', surname: 'chai', email: 'mocha@chai.com', username: 'mochachai', password: hash })
                const post = new Post({ author: user.id, title: 'Guat?', image: 'https://media.giphy.com/media/9s8Jq3Sc1ZnZS/giphy.gif?cid=790b7611q0j0qp6fk3y22og583sejq46q35r5e8trx18k873&ep=v1_gifs_trending&rid=giphy.gif&ct=g', description: 'oops' })

                return Promise.all([user.save(), post.save()])
            })
            .then(([user, post]) =>
                toggleLikePost(user.id, post.id)
                    .then(() => Post.findById(post.id))
                    .then((post) => {
                        expect(post.liked.map(userObjectId => userObjectId.toString())).to.contain(user.id)
                    })
            )
    )


    it('succeeds on exiting user and post with likes', () =>

        bcrypt.hash('1234', 8)
            .then(hash => {
                const user = new User({ name: 'mocha', surname: 'chai', email: 'mocha@chai.com', username: 'mochachai', password: hash })
                const post = new Post({ author: user.id, title: 'Guat?', image: 'https://media.giphy.com/media/9s8Jq3Sc1ZnZS/giphy.gif?cid=790b7611q0j0qp6fk3y22og583sejq46q35r5e8trx18k873&ep=v1_gifs_trending&rid=giphy.gif&ct=g', description: 'oops', liked: [user.id] })

                return Promise.all([user.save(), post.save()])
            })
            .then(([user, post]) =>
                toggleLikePost(user.id, post.id)
                    .then(() => Post.findById(post.id))
                    .then((post) => {
                        expect(post.liked).to.be.empty
                    })
            )
    )


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})

