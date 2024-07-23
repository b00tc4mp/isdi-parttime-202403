import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'

import { Post, User } from '../data/models/index.js'
import deletePost from './deletePost.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('deletePost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Post.deleteMany()).then(() => User.deleteMany))

    beforeEach(() => Post.deleteMany().then(() => User.deleteMany()))

    it('succes delete post', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash }))
            .then(user => Post.create({ author: user.id, title: 'test', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif', description: 'testing api' })
                .then((post) =>
                    deletePost(user.id, post.id)
                )
            )
            .then(() =>
                Post.find().then((posts) => {
                    expect(posts).to.be.an('array').that.is.empty
                })
            )
    )

    it('fails on user not found', () => {
        let errorThrown


            return Post.create({ author: new ObjectId().toString(), title: 'test', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif', description: 'testing api' })
                .then((post) => 
                    deletePost(new ObjectId().toString(), post.id)
                        .catch(error => errorThrown = error)
                        .finally(() => {
                            expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                            expect(errorThrown.message).to.equal('user not found')
                        })
                )
    })

    it('fails on post not found', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash }))
            .then(user => Post.create({ author: user.id, title: 'test', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif', description: 'testing api' })
                .then((post) =>
                    deletePost(user.id, new ObjectId().toString())
                        .catch(error => errorThrown = error)
                        .finally(() => {
                            expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                            expect(errorThrown.message).to.equal('post not found')
                        })
                )
            )
    })

    it('fails on invalid userId',() => {
        let errorThrown

        try{
            deletePost(4323, new ObjectId().toString())
        }catch(error){
            errorThrown = error
        }finally{
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid postId',() => {
        let errorThrown

        try{
            deletePost(new ObjectId().toString(), 54324)
        }catch(error){
            errorThrown = error
        }finally{
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('postId is not valid')
        }
    })

    after(()=> Promise.all([User.deleteMany(), Post.deleteMany()]).then(()=> mongoose.disconnect()))
})


