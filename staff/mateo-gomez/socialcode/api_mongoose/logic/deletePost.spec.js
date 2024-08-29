import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { User, Post } from '../data/models/index.js'

import deletePost from './deletePost.js'

import { NotFoundError, ContentError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('deletePost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST)
        .then(() => User.deleteMany().then(() => Post.deleteMany()))
    )
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeds on delete Post', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book', username: 'macbook', password: hash }))
            .then(user => Post.create({
                author: user.id,
                title: "Hello Title",
                image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                description: "hello description",
                liked: []


            })
                .then((post) => ({ user, post }))
            )
            .then(({ user, post }) =>
                deletePost(user.id, post.id)
            )
            .then(postId =>
                Post.findById(postId).then(deletedPost => {
                    expect(deletedPost).to.be.null
                })
            )
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return Post.create({
            author: new ObjectId().toString(),
            title: "Hello Title",
            image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
            description: "hello description",
            liked: []

        })
            .then((post) => deletePost(new ObjectId().toString(), post.id)
            )
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing post', () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then((hash) => User.create({
                name: "Mocha",
                surname: "Chai",
                email: "Mocha@Chai.com",
                username: "MochaChai",
                password: hash
            })
                .then((user) => deletePost(user.id, new ObjectId().toString())))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("post not found")
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            deletePost(11111, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid postId', () => {
        let errorThrown

        try {
            deletePost(new ObjectId().toString(), 11111)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('postId is not valid')
        }
    })

    it('fails on non-match user', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
            .then(hash => {
                const user = new User({
                    name: "Mocha",
                    surname: "Chai",
                    email: "Mocha@Chai.com",
                    username: "MochaChai",
                    password: hash
                })
                const post = new Post({
                    author: new ObjectId().toString(),
                    title: "Hello Title",
                    image: "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
                    description: "hello description",
                    liked: []
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


    after(() => Post.deleteMany().then(() => User.deleteMany()).then(() => mongoose.disconnect()))
})