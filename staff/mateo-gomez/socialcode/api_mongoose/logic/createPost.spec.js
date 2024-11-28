import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { User, Post } from '../data/models/index.js'

import createPost from './createPost.js'

import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('createPost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST)
        .then(() => User.deleteMany().then(() => Post.deleteMany()))
    )

    //beforeEach(() => User.deleteMany().then(() => Post.deleteMany()))
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeds on create Post', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book', username: 'macbook', password: hash }))
            .then((user) => createPost(user.id, 'hello testing', 'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif?cid=790b7611ag53grtm2l9v7zkej3pa7xbipod2e58cmca4b9hs&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'testing is hard', [], [])
                .then(() => user)
            )
            .then((user) => Post.findOne()
                .then((post) => {
                    expect(post.author.toString()).to.equal(user.id.toString())
                    expect(post.title).to.equal('hello testing')
                    expect(post.image).to.equal('https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif?cid=790b7611ag53grtm2l9v7zkej3pa7xbipod2e58cmca4b9hs&ep=v1_gifs_search&rid=giphy.gif&ct=g')
                    expect(post.description).to.equal('testing is hard')
                    expect(post.comment).to.be.an('array')
                    expect(post.liked).to.be.an('array')
                })
            )

    )

    it('fails on non-existing user', () => {
        let errorThrown
        return createPost(new ObjectId().toString(), 'hello testing', 'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif?cid=790b7611ag53grtm2l9v7zkej3pa7xbipod2e58cmca4b9hs&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'testing is hard')

            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })


    it('fails on invalid userId', () => {
        let errorThrown

        try {
            createPost(1111111, 'hello testing', 'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif?cid=790b7611ag53grtm2l9v7zkej3pa7xbipod2e58cmca4b9hs&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'testing is hard')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })


    it('fails on invalid title', () => {
        let errorThrown

        try {
            createPost(new ObjectId().toString(), 1111111, 'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif?cid=790b7611ag53grtm2l9v7zkej3pa7xbipod2e58cmca4b9hs&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'testing is hard')
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
            createPost(new ObjectId().toString(), 'hello testing', 7777, 'testing is hard')
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
            createPost(new ObjectId().toString(), 'hello testing', 'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif?cid=790b7611ag53grtm2l9v7zkej3pa7xbipod2e58cmca4b9hs&ep=v1_gifs_search&rid=giphy.gif&ct=g', 111111)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })


    after(() => User.deleteMany().then(() => Post.deleteMany()).then(() => mongoose.disconnect()))
})