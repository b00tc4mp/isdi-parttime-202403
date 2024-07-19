import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Post, User } from '../data/index.js'

import getAllPosts from './getAllPosts.js'

import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types



describe('getAllPosts', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on get all posts', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow.com',
                username: 'JonSnow',
                password: hash
            }))
            .then(user => Post.create({
                author: user.id,
                title: 'Jon Snow',
                image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTNxOWN2bjBpaHBmZnMzbHdjbW5zOG1kZXR2bGlqZTk4ejg4djQwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzdUi5U8LBb4GD4s/giphy.gif',
                description: 'PlaySomeMusic'
            })
                .then(() => user)
            )
            .then((user) => getAllPosts(user.id))
            .then((posts) => {
                expect(posts).to.be.an('array')
                expect(posts).to.have.lengthOf(1)
            })
    )
    it('fails on non existing user', () => {
        let errorThrown

        return getAllPosts(new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getAllPosts(1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
})