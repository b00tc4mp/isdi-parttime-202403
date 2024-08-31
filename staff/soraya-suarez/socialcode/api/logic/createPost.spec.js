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
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Post.deleteMany()])
    }))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds on existing user', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Mac', 
                surname: 'Book', 
                email: 'mac@book.com', 
                username: 'macbook', 
                password: hash 
            }))
            .then(user =>
                createPost(user.id, 'Hola', 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif', 'funcionará el test?')
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post.author.toString()).to.equal(user.id)
                        expect(post.title).to.equal('Hola')
                        expect(post.image).to.equal('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif')
                        expect(post.description).to.equal('funcionará el test?')
                    })
            )
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return createPost(new ObjectId().toString(), 'hola', 'https://media.giphy.com/media/fUQ4rhUZJYiQsas6WD/giphy.gif?cid=790b7611mq7n0tqwwy0boxgx2dd9xhb6qo7r0lh2iih8i1b6&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'Holita')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    /*it('fails on invalid userId', () => {
        let errorThrown
        
        try {
          createPost(1234, 'título', 'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'descripción')
        } catch (error) {
          errorThrown = error
        } finally {
          expect(errorThrown).to.be.instanceOf(ContentError)
          expect(errorThrown.message).to.equal('userId is not valid')
        }
      })
    */

      it('fails on invalid title', () => {
        let errorThrown

        try {
          createPost(new ObjectId().toString(), 1234, 'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 'holita')
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
          createPost(new ObjectId().toString(), 'hola', 12312313, 'holita')
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
          createPost(new ObjectId().toString(), 'hola', 'https://media.giphy.com/media/fUQ4rhUZJYiQsas6WD/giphy.gif?cid=790b7611mq7n0tqwwy0boxgx2dd9xhb6qo7r0lh2iih8i1b6&ep=v1_gifs_trending&rid=giphy.gif&ct=g', 7777)
        } catch (error) {
          errorThrown = error
        } finally {
          expect(errorThrown).to.be.instanceOf(ContentError)
          expect(errorThrown.message).to.equal('description is not valid')
        }
      })

    after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
})