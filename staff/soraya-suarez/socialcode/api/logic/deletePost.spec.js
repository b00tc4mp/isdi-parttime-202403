import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt, { hash } from 'bcryptjs'
import { expect } from 'chai'
import { Post, User } from '../data/index.js'
import deletePost from './deletePost.js'
import { NotFoundError, ContentError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('deletePost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on delete post', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Mac', 
                surname: 'Book', 
                email: 'mac@book.com', 
                username: 'macbook', 
                password: hash 
            }))
            .then(user =>
                Post.create({
                    author: user.id,
                    title: 'title',
                    image: 'https://media.giphy.com/media/R6gvnAxj2ISzJdbA63/giphy.gif?cid=790b7611bizkfmqnjwx7km1dm9kpvdyvt83kleejub2bg0jq&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
                    description: 'description',
                    likes: []
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
            title: 'title',
            image: 'https://media.giphy.com/media/fUQ4rhUZJYiQsas6WD/giphy.gif?cid=790b7611mq7n0tqwwy0boxgx2dd9xhb6qo7r0lh2iih8i1b6&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 
            description: 'description',
            likes: []
        })
            .then((post) => deletePost(new ObjectId().toString(), post.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })
    
    it('fails on non-existing post', () => {
        let errorThrown
    
        return bcrypt.hash('123123123', 8)
          .then((hash) => User.create({
            name: 'Mac',
            surname: 'Book',
            email: 'mac@book.com',
            username: 'macbook',
            password: hash
          })
          .then((user) => deletePost(user.id, new ObjectId().toString())))
          .catch(error => errorThrown = error)
          .finally(() => {
            expect(errorThrown).to.be.an.instanceOf(NotFoundError)
            expect(errorThrown.message).to.equal('post not found')
          })
    })

    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
})