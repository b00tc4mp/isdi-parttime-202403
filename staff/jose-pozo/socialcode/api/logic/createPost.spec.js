import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Post, User } from '../data/index.js'

import createPost from './createPost.js'

import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('createPost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeds on new post', () =>
        bcrypt.hash('123123', 8)
            .then(hash => User.create({ name: 'Jon', surname: 'Snow', email: 'jon@snow.com', username: 'JonSnow', password: hash }))
            .then(user =>
                createPost(user.id, 'Jon Snow', 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTNxOWN2bjBpaHBmZnMzbHdjbW5zOG1kZXR2bGlqZTk4ejg4djQwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzdUi5U8LBb4GD4s/giphy.gif', 'No habrá spin off de Jon Snow', [], [])
                    .then(post => Post.findOne())
                    .then(post => {
                        expect(post.author.toString()).to.equal(user.id)
                        expect(post.title).to.equal('Jon Snow')
                        expect(post.image).to.equal('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTNxOWN2bjBpaHBmZnMzbHdjbW5zOG1kZXR2bGlqZTk4ejg4djQwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzdUi5U8LBb4GD4s/giphy.gif')
                        expect(post.description).to.equal('No habrá spin off de Jon Snow')
                    })
            )
    )

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            createPost(1234, 'Jon Snow', 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTNxOWN2bjBpaHBmZnMzbHdjbW5zOG1kZXR2bGlqZTk4ejg4djQwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzdUi5U8LBb4GD4s/giphy.gif', 'No habrá spin off de Jon Snow', [], [])
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid title', () => {
        let errorThrown

        try {
            createPost(new ObjectId().toString(), 1234, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTNxOWN2bjBpaHBmZnMzbHdjbW5zOG1kZXR2bGlqZTk4ejg4djQwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzdUi5U8LBb4GD4s/giphy.gif', 'No habrá spin off de Jon Snow', [], [])
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('title is not valid')
        }
    })

    it('fails on invalid image', () => {
        let errorThrown

        try {
            createPost(new ObjectId().toString(), 'Jon Snow', 1234, 'PlaySomeMusic', [])
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('image is not valid')
        }
    })

    it('fails on invalid description', () => {
        let errorThrown

        try {
            createPost(new ObjectId().toString(), 'Jon Snow', 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTNxOWN2bjBpaHBmZnMzbHdjbW5zOG1kZXR2bGlqZTk4ejg4djQwNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohzdUi5U8LBb4GD4s/giphy.gif', 1234, [], [])
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))

})