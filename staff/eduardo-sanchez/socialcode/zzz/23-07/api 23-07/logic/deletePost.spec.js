import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Post, User } from '../data/index.js'

import deletePost from './deletePost.js'

import { ContentError, NotFoundError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

debugger

describe('deletePost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on deleting a post from an existing user', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash }))
            .then(user =>
                Post.create({ author: user._id, title: 'Hola', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif', description: 'funcionará el test?', date: new Date(), likes: [] })
                    .then((post) => deletePost(user.id, post.id).then(() => post.id))
            )
            .then((postId) => Post.findById(postId))
            .then(deletedPost => {
                expect(deletedPost).to.be.null
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash("123123123", 8)
            .then(hash => User.create({ name: "Amigo", surname: "Mio", email: "amigo@mio.com", username: "amigomio", password: hash }))
            .then(() => Post.create({ author: new ObjectId().toString(), title: 'Bye', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif', description: 'test funcionando...', date: new Date(), likes: [] }))

            .then((post) =>
                deletePost(new ObjectId().toString(), post.id)
            )
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })
    })

    it('fails on non-existing post', () => {
        let errorThrown

        return bcrypt.hash("123123123", 8)
            .then(hash => User.create({ name: "Amigo", surname: "Mio", email: "amigo@mio.com", username: "amigomio", password: hash }))

            .then((user) =>
                deletePost(user.id, new ObjectId().toString())
            )
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("post not found")
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            deletePost(12345, new ObjectId().toString())
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }

    })

    it('fails on invalid postId', () => {
        let errorThrown

        try {
            deletePost(new ObjectId().toString(), 12345)
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("postId is not valid")
        }

    })

    it('fails on mismatching post author', () => {
        let errorThrown

        return Promise.all([
            bcrypt.hash('123123123', 8).then(hash => User.create({ name: 'User1', surname: 'One', email: 'user1@one.com', username: 'user1', password: hash })),
            bcrypt.hash('123123123', 8).then(hash => User.create({ name: 'User2', surname: 'Two', email: 'user2@two.com', username: 'user2', password: hash }))
        ])
            .then(([user1, user2]) =>
                Post.create({ author: user1._id, title: 'Hola', image: 'https://example.com/image.jpg', description: 'funcionará el test?' })
                    .then(post => deletePost(user2._id.toString(), post._id.toString()))
            )
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(MatchError)
                expect(errorThrown.message).to.equal('post author does not match user & cannot be deleted')
            })
    })

    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
})