import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User, Post } from '../data/index.js'
import toggleLikePost from './toggleLikePost.js'
import { NotFoundError, ContentError } from 'com/error.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types


describe('toggleLikePost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    // it('succeeds on existing user and post with no likes', () =>

    //     bcrypt.hash('123456789', 8)
    //         .then(hash => {
    //             const user = new User({ name: 'Mocha', surname: 'Chai', email: 'Mocha@Chai.com', username: 'MochaChai', password: hash })

    //             const post = new Post({ author: user.id, title: 'Hello world', image: 'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g', description: 'funcionara el test' })

    //             return Promise.all([user.save(), post.save()])
    //         })
    //         .then(([user, post]) =>
    //             toggleLikePost(user.id, post.id)
    //                 .then(() => Post.findById(post.id))
    //                 .then(post => {
    //                     expect(post.liked.map(userObjectId =>
    //                         userObjectId.toString())).to.contain(user.id)
    //                 })
    //         )
    // )

    // it('succeeds on existing user and post with likes', () =>

    //     bcrypt.hash('1234', 8)
    //         .then(hash => {
    //             const user = new User({ name: 'Mocha', surname: 'Chai', email: 'Mocha@Chai.com', username: 'MochaChai', password: hash })

    //             const post = new Post({ author: user.id, title: 'Hello world', image: 'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g', description: 'hello description', liked: [user.id] })

    //             return Promise.all([user.save(), post.save()])
    //         })
    //         .then(([user, post]) =>
    //             toggleLikePost(user.id, post.id)
    //                 .then(() => Post.findById(post.id))
    //                 .then((post) => {
    //                     expect(post.liked).to.be.empty
    //                 })
    //         )
    // )

    it('fails on non-exsiting user', () => {
        let errorThrown

        return Post.create({ author: new ObjectId(), title: 'Hello world', image: 'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g', description: 'hello description', liked: [] })
            .then((post) => toggleLikePost(new ObjectId().toString(), post.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing post', () => {
        let errorThrown

        return bcrypt.hash('123456789', 8)
            .then((hash) => User.create({
                name: 'Mocha',
                surname: 'Chai',
                email: 'Mocha@Chai.com',
                username: 'MochaChai',
                password: hash
            })
                .then((user) => toggleLikePost(user.id, new ObjectId().toString())))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('posts not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            toggleLikePost(123456789, new ObjectId().toString())
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
            toggleLikePost(new ObjectId().toString(), 12345)
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('postId is not valid')
        }
    })

    after(() => Post.deleteMany().then(() => User.deleteMany().then(() => mongoose.disconnect())))
})