import 'dotenv/config'

import bcrypt from 'bcryptjs'

import mongoose, { Types } from 'mongoose'

const { MONGODB_URL_TEST } = process.env

import { expect } from 'chai'

import { User, Post } from '../data/index.js'

import deletePost from '../logic/deletePost.js'

import { ContentError, MatchError, NotFoundError } from 'com/errors.js'

const { ObjectId } = Types

describe('deletePost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on delete post', () =>
        bcrypt.hash('1234', 8)
            .then((hash) => {
                const user = new User({
                    name: 'Jon',
                    surname: 'Snow',
                    email: 'jon@snow.com',
                    username: 'JonSnow',
                    password: hash
                })
                const post = new Post({
                    author: user.id,
                    title: 'Jon Snow',
                    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTNxOWN2bjBpaHBmZnMzbHdjbW5zOG1kZXR2bGlqZTk4ejg4djQwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzdUi5U8LBb4GD4s/giphy.gif',
                    description: 'PlaySomeMusic'
                })
                return Promise.all([user.save(), post.save()])
            })
            .then(([user, post]) => deletePost(user.id, post.id))
            .then(postIdDeleted => Post.findById(postIdDeleted))
            .then((postIdDeleted) => {
                expect(postIdDeleted).to.be.null
            })
    )

    it('fails on non existing user', () => {
        let errorThrown

        return Post.create({
            author: new ObjectId,
            title: 'Jon Snow',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTNxOWN2bjBpaHBmZnMzbHdjbW5zOG1kZXR2bGlqZTk4ejg4djQwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzdUi5U8LBb4GD4s/giphy.gif',
            description: 'PlaySomeMusic'
        })
            .then(post => deletePost(new ObjectId().toString(), post.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non existing post', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow.com',
                username: 'JonSnow',
                password: hash
            }))
            .then(user => deletePost(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('post not found')
            })
    })

    it('fails on not match user', () => {
        let errorThrown

        bcrypt.hash('1234', 8)
            .then((hash) => {
                const user = new User({
                    name: 'Jon',
                    surname: 'Snow',
                    email: 'jon@snow.com',
                    username: 'JonSnow',
                    password: hash
                })
                const post = new Post({
                    author: new ObjectId().toString(),
                    title: 'Jon Snow',
                    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTNxOWN2bjBpaHBmZnMzbHdjbW5zOG1kZXR2bGlqZTk4ejg4djQwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzdUi5U8LBb4GD4s/giphy.gif',
                    description: 'PlaySomeMusic'
                })
                return Promise.all([user.save(), post.save()])
            })
            .then(([user, post]) => deletePost(user.id, post.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(MatchError)
                expect(errorThrown.error).to.equal('post author does not match user')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            deletePost(1234, new ObjectId().toString())
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
            deletePost(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('postId is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
})

