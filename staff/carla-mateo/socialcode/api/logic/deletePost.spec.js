import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"

import deletePost from "./deletePost.js"
import { User, Post } from "../data/index.js"

import { expect } from "chai"
import { MatchError, NotFoundError, ContentError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

debugger

describe('deletePost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Post.deleteMany()])
    }))
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeds on delete post', () =>

        bcrypt.hash('1234', 8)
            .then((hash) => {
                const user = new User({
                    name: "ana",
                    surname: "bana",
                    email: "ana@bana.com",
                    username: "banana",
                    password: hash
                })
                const post = new Post({
                    author: user.id,
                    title: 'Prueba',
                    image: 'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
                    description: 'Vivan los test'
                })
                return Promise.all([user.save(), post.save()])
            })
            .then(([user, post]) => deletePost(user.id, post.id))
            .then(postIdDeleted => Post.findById(postIdDeleted))
            .then((postIdDeleted) => {
                expect(postIdDeleted).to.be.null
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return Post.create({
            author: new ObjectId().toString(),
            title: 'Prueba',
            image: 'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
            description: 'Vivan los test'
        })
            .then((post) => {
                return deletePost(new ObjectId().toString(), post.id)
            })
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('❌user not found')
            })
    })

    it('fails on non-existing post', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: "ana",
                surname: "bana",
                email: "ana@bana.com",
                username: "banana",
                password: hash
            }))
            .then((user) => {
                return deletePost(user.id, new ObjectId().toString())
            })
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('❌post not found')
            })
    })

    it('succeds on delete post', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then((hash) => {
                const user = new User({
                    name: "ana",
                    surname: "bana",
                    email: "ana@bana.com",
                    username: "banana",
                    password: hash
                })
                const post = new Post({
                    author: new ObjectId().toString(),
                    title: 'Prueba',
                    image: 'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
                    description: 'Vivan los test'
                })
                return Promise.all([user.save(), post.save()])
            })
            .then(([user, post]) => deletePost(user.id, post.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(MatchError)
                expect(errorThrown.message).to.equal('❌post author does not match user')
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
            expect(errorThrown.message).to.equal('❌ userId is not valid')
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
            expect(errorThrown.message).to.equal('❌ postId is not valid')
        }
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})