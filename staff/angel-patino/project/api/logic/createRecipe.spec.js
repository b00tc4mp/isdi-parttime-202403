import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Recipe, User } from '../data/index.js'

import createRecipe from './createRecipe.js'

import { ContentError, NotFoundError } from 'com/errors.js'

const { ObjectId } = Types

const { MONGODB_URL_TEST } = process.env

debugger

describe('createRecipe', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Recipe.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Recipe.deleteMany()]))


    it('succeeds on new recipe', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Super', surname: 'Chef', email: 'super@chef.com', username: 'Superchef', password: hash }))
            .then(user =>
                createRecipe(user.id, 'Hello Recipe', "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 2, [{ name: 'milk', quantity: 20, unit: 'ml' }, { name: 'chocolate', quantity: 1, unit: 'grams' }], 'funcionará?')
                    .then(() => Recipe.findOne())
                    .then(recipe => {

                        // Convertir cada ingrediente a un objeto simple usando map y toObject()
                        const ingredients = recipe.ingredients.map(ingredient => ingredient.toObject ? ingredient.toObject() : ingredient)

                        // Eliminar propiedades adicionales de Mongoose (_id, __v)
                        ingredients.forEach(ingredient => {
                            delete ingredient._id
                            delete ingredient.__v
                        })

                        expect(recipe.author.toString()).to.equal(user.id)
                        expect(recipe.title).to.equal('Hello Recipe')
                        expect(recipe.thumbnail).to.equal("https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g")
                        expect(recipe.cookTime).to.equal(2)
                        expect(ingredients).to.deep.equal([{ name: 'milk', quantity: 20, unit: 'ml' }, { name: 'chocolate', quantity: 1, unit: 'grams' }])
                        expect(recipe.description).to.equal('funcionará?')



                    })
            )
    )
    it('fails on non-existing user', () => {
        let errorThrown

        return createRecipe(new ObjectId().toString(), 'Hello Recipe', "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 2, [{ name: 'milk', quantity: 20, unit: 'ml' }, { name: 'chocolate', quantity: 1, unit: 'grams' }], 'funcionará?')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            createRecipe(123456, 'Hello Recipe', "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 2, [{ name: 'milk', quantity: 20, unit: 'ml' }, { name: 'chocolate', quantity: 1, unit: 'grams' }], 'funcionará?')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid title', () => {
        let errorThrown

        try {
            createRecipe(new ObjectId().toString(), 123456789, "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 2, [{ name: 'milk', quantity: 20, unit: 'ml' }, { name: 'chocolate', quantity: 1, unit: 'grams' }], 'funcionará?')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('title is not valid')
        }
    })

    it('fails on invalid url', () => {
        let errorThrown

        try {
            createRecipe(new ObjectId().toString(), 'Hello Recipe', 123456789, 2, [{ name: 'milk', quantity: 20, unit: 'ml' }, { name: 'chocolate', quantity: 1, unit: 'grams' }], 'funcionará?')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('image is not valid')
        }
    })

    it('fails on invalid description', () => {
        let errorThrown

        try {
            createRecipe(new ObjectId().toString(), 'Hello Recipe', "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 2, [{ name: 'milk', quantity: 20, unit: 'ml' }, { name: 'chocolate', quantity: 1, unit: 'grams' }], 123456789)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })

    // it('fails on invalid rating', () => {
    //     let errorThrown

    //     try {
    //         createRecipe(new ObjectId().toString(), 'Hello Recipe', "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 2, [{ name: 'milk', quantity: 20, unit: 'ml' }, { name: 'chocolate', quantity: 1, unit: 'gr' }], 'funcionará?',9)
    //     } catch (error) {
    //         errorThrown = error
    //     } finally {
    //         expect(errorThrown).to.be.an.instanceOf(ContentError)
    //         expect(errorThrown.message).to.equal('rating must be a number between 1 and 5.')
    //     }
    // })


    it('fails on missing title', () => {
        let errorThrown

        try {
            createRecipe(new ObjectId().toString(), '', [{ name: 'milk', quantity: 20, unit: 'ml' }, { name: 'chocolate', quantity: 1, unit: 'grams' }], "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", 2, 'funcionará?')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('title is not valid')
        }
    })

    after(() => Promise.all([Recipe.deleteMany(), User.deleteMany()]).then(() => mongoose.disconnect()))
})

