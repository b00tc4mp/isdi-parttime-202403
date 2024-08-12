import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Recipe, User } from '../data/index.js'

import createRecipe from './createRecipe.js'

import { ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('createRecipe', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Recipe.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Recipe.deleteMany()]))


    it('succeeds on new recipe', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Super', surname: 'Chef', email: 'super@chef.com', username: 'Superchef', password: hash }))
            .then(user =>
                createRecipe(user.id, 'Hello Recipe', 'sugar', "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 2, ['sugar', 'chocolate'], 'funcionará?', 1)
                    .then(() => Recipe.findOne())
                    .then(recipe => {
                        expect(recipe.author.toString()).to.equal(user.id)
                        expect(recipe.title).to.equal('Hello Recipe')
                        expect(recipe.source).to.equal('sugar')
                        expect(recipe.thumbnail).to.equal("https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g")
                        expect(recipe.cookTime).to.equal(2)
                        expect(recipe.ingredients).to.equal(['sugar', 'chocolate'])
                        expect(recipe.rating).to.equal(1)
                        expect(recipe.description).to.equal('funcionará?')

                    })
            )
    )
    it('fails on non-existing user', () => {
        let errorThrown

        return createRecipe('Juanito', 'Hello Recipe', 'sugar', "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 2, '100gr sugar, 50gr chocolate', 'funcionará?', 1)
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('user not found');
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            createRecipe(123456, 'Hello Recipe', 'sugar, chocolate', "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 2, '100gr sugar, 50gr chococale', 'funcionará?', 1)
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
            createRecipe(new ObjectId().toString(), 123456789, 'sugar, chocolate', "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 2, '100gr sugar, 50gr chocolate', 'funcionará?', 1)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('title is not valid')
        }
    })

    it('fails on invalid url', () => {
        let errorThrown

        try {
            createRecipe(new ObjectId().toString(), 'Hello Recipe', 'sugar, chocolate', 123456789, 2, '100gr sugar, 50gr chocolate', 'funcionará?', 1)
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
            createRecipe(new ObjectId().toString(), 'Hello Recipe', 'sugar, chocolate', "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 2, '100gr sugar, 50gr chocolate', 123456789, 1)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })

    after(() => Promise.all([Recipe.deleteMany(), User.deleteMany()]).then(() => mongoose.disconnect()))
})

